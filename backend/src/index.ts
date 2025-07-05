import { Hono } from "hono";
import { PrismaClient } from "./generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  sign,  } from "hono/jwt";
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET : string
  };
}>();

//initialize handlers
// signup

app.post("/api/v1/users/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

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
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
});
// signin
app.post("api/v1/users/signin", (c) => {});

// blog
app.post("api/v1/blog", (c) => {});
//
app.put("api/v1/blog", (c) => {});

app.get("/api/v1/blog/:id", (c) => {});
app.get("/api/v1/blog/bulk", (c) => {});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default app;
