import { Hono } from 'hono'

const app = new Hono()

//initialize handlers 
// signup 
app.post("/api/v1/users/signup" , (c)=>{
  
})
// signin 
app.post("api/v1/users/signin" , (c)=>{

})

// blog 
app.post("api/v1/blog" , (c)=>{

})
//
app.put("api/v1/blog",(c)=>{

})


app.get("/api/v1/blog/:id" , (c)=>{


})
app.get("/api/v1/blog/bulk" , (c)=>{


})


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
