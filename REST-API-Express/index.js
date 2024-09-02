const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3000;
const users = require("./MOCK_DATA.json");

//middleware to use urlencoded data as body
app.use(express.urlencoded({extended: false}))

// app.get("/api/users",(req,res)=>{
//         return res.json(users);
// })

// app.get("/api/users/:id",(req,res)=>{
//     const id =Number(req.params.id);
//    const user = users.find((user)=>user.id === id);
//     return res.send(user);
// })

// app.post("/api/users",(req,res)=>{
//     const body = req.body;
//     console.log(body);
//     users.push({id: users.length +1 ,...body  });
//     fs.writeFile( "./MOCK_DATA.json", JSON.stringify(users),(err,data)=>{
//         res.send(`Successful POST request ${users.length}`)

//     })

// })

app.patch("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const body = req.body;
    // console.log(body);
 
    const user = users.find((user)=>user.id === id);
    const index = users.indexOf(user);
    const updatedUser = Object.assign(user,body);
    users[index]=user;
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err)=>{
        res.send(`PATCH successful JSON : ${user}`);
    })

})
app.listen(PORT,()=>{ console.log(`Server running at PORT: ${PORT}`)})