const express = require("express");
const fs = require("fs");
const app = express();

const PORT = 3000;
const users = require("./MOCK_DATA.json");

//middleware to use urlencoded data as body
app.use(express.urlencoded({ extended: false }));

app.use((req,res,next)=>{
    fs.appendFile("log.txt",`${Date.now()}: ${req.method}: ${req.path}:    ${req.ip}`,(err)=>{
        next();
    })
})

//get users objects
app.get("/api/users", (req, res) => {
    res.setHeader("X-MyEnv","Development");
    return res.status(200).json(users);
})
//get user object
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);


    if (!user) {
        return res.status(404).send("Failed doesnot exist!");
    }

    
    return res.status(200).json(user);


   
})
//post user object
app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log(body);
    users.push({ id: users.length + 1, ...body });

    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){

            res.status(400).json("All fields are required!");
    }
    
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        res.status(201).json(`Successful POST request ${users.length}`)

    })

})
//patch user object (edit)
app.patch("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    // console.log(body);
   
    const user = users.find((user) => user.id === id);
    const index = users.indexOf(user);
    const updatedUser = Object.assign(user, body);
    users[index] = user;

    if (!user) {
        return res.status(404).send("Failed doesnot exist!");
    }

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
        res.status(200).json(`PATCH successful JSON : ${user}`);
    })

})


app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    const index = users.indexOf(user);

    users.splice(index, 1);

    if (!user) {
        return res.status(404).send("Failed doesnot exist!");
    }



    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err) => {
        res.status(200).json(`DELETE successful JSON object`);
    })

})

app.listen(PORT, () => { console.log(`Server running at PORT: ${PORT}`) })