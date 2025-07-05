import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    };
}>();

// middleware for authcheck 
blogRouter.use("/*", async (c, next)=>{
    const header = c.req.header("authorization") || ""
    const token = header.split(" ")[1]

    const response = await verify(token, c.env.JWT_SECRET)
    if (response.id) {
        next();
    }
    else {
        c.status(403)
        return c.json({ error: "unauthorized" })
    }
})

//blog 
blogRouter.post("/blog", (c) => {
    
 });
//
blogRouter.put("/blog", (c) => { });

blogRouter.get("/blog/:id", (c) => { });
blogRouter.get("/blog/bulk", (c) => { });
