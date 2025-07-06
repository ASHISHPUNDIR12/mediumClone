import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { auth } from "hono/utils/basic-auth";
import { createBlogInput, updateBlogInput } from "@ashu777/medium-common";

type MyHonoEnv = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: number;
  };
};

export const blogRouter = new Hono<MyHonoEnv>();

// middleware for authcheck
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  //   const token = authHeader.split(" ")[1];

  try {
    const response = await verify(authHeader, c.env.JWT_SECRET);
    if (response && typeof response === "object" && "id" in response) {
      c.set("userId", Number(response.id));
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ error: "unauthorized" });
  }
});

//blog
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "inputs not correct",
    });
  }

  const authorId = c.get("userId") as number;
  try {
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      error: e,
    });
  }
});
//
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "inputs not correct",
    });
  }

  const userId = c.get("userId") as number;

  try {
    // First check if the post exists and belongs to the user
    const existingPost = await prisma.post.findFirst({
      where: {
        id: body.id,
        authorId: userId,
      },
    });

    if (!existingPost) {
      c.status(404);
      return c.json({
        error: "Post not found or you don't have permission to update it",
      });
    }

    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({
      id: blog.id,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      error: "Failed to update post",
    });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.post.findMany();
  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({
        error: "Post not found",
      });
    }

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      error: "Failed to fetch post",
    });
  }
});
