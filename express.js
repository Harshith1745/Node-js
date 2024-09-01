const express = require("express")

const app = express();

app.get('/',(req,res)=>{
    res.send("Hello from homepage")
})

app.get('/about',(req,res)=>{  
    res.send("hello from about page" + "name" + req.query.name);
})




app.listen(8000, ()=>{console.log("server running at 8000")});