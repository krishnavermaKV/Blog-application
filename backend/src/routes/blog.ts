import { Hono } from 'hono'
import  { PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '@pkriya/blogapp-common';

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
    }>();

blogRouter.use('/*', async (c, next) =>  {
    //get header 
    //verify header
    //if the header is correct we need can proceed
    //ifnot, we returnn the user a 403 status code
    const token = c.req.header("authorization") || "";
    try{
        const response = await verify(token , c.env.JWT_SECRET);

        if(response){
              // @ts-ignore
            c.set("userId", response.id);
            await next();
        }
        else{
          c.status(403);
          return c.json({error: "unathorized"})
        }
    }
    catch(e){
        c.status(403);
        return c.json({
            message: "you are not logged in"
        })
    }
  
});

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
       c.status(411);
       return c.json({
         message: "wrong input type"
       })
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })

    return c.json({
        id: blogs.id
    })
});

blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
       c.status(411);
       return c.json({
         message: "wrong input type"
       })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })
  })

    // Todo: add pagination
blogRouter.get("/bulk", async (c) => {
      const prisma = new PrismaClient({
          datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      try {
        const blogs = await prisma.post.findMany({
          select: {
            id: true,
            title: true,
            content: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        });
    
        return c.json({
          blogs});
      } catch (error) {
        c.status(500);
        return c.json({ message: "Error fetching blogs"});
      }
    });
    

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
       datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
   try{
    const blog = await prisma.post.findFirst({
        where: {
            id: id
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
          select: {
            name: true
          }
        }
        }
    })
    return c.json({
        blog
    });
}
catch(e){
  c.status(411);
  return c.json({
    message: "Error while fetching blog post "
  })
}
  });

