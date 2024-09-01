const express = require("express")
const fs = require("fs")

const app = express();

const log = `${Date.now()}  ${req.url}  ${req.ip} \n`

const logAReq= fs.appendFile("./log.txt",log.toString(),(err,data)=>{})


    app.get('/',(req,res)=>{
        res.send("Hello from homepage")
        logAReq(req);
    })
    app.get('/about',(req,res)=>{  
        res.send("hello from about page" + "name" + req.query.name);
        logAReq(req);
    })





app.listen(8000, ()=>{console.log("server running at 8000")});