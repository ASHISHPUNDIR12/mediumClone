import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { signinInput, signupInput } from "@ashu777/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {  
    userId: number;
  };
}>();

const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header("authorization") || "";

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
};

// signup
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  // zod validation 
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "inputs not correct",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      c.status(400);
      return c.json({
        error: "User with this email already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name, // Added: Include name field from request body
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt: token,
    });
  } catch (error) {
    c.status(500);
    return c.json({
      error: "Internal server error",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// signin
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "inputs not correct",
    });
  }
  
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });

  if (!user || user.password !== body.password) {
    c.status(403);
    return c.json({
      error: "Invalid credentials",
    });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    msg: "signin successful",
    jwt: jwt,
  });
});

// me 
userRouter.get("/me", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId") as number;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ error: "User not found" });
    }

    return c.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});