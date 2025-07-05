import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {  sign, verify,  } from "hono/jwt";
import { signinInput, signupInput } from "@ashu777/medium-common";

export const userRouter  = new Hono<{
    Bindings:{
        DATABASE_URL : string
        JWT_SECRET : string
    }
}>();

// signup

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,    
  }).$extends(withAccelerate());

    const body = await c.req.json();

  const {success} = signupInput.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
        message : "inputs not correct"
    })
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
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
   const {success} = signinInput.safeParse(body)

  if(!success){
    c.status(411)
    return c.json({
        message : "inputs not correct"
    })
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    }
  });
  
  if (!user || user.password !== body.password) {
    c.status(403);
    return c.json({
      error: "Invalid credentials"
    });
  }
  
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    msg: "signin successful",
    jwt: jwt
  });
});
