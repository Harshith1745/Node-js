const express = require("express");
const fs = require("fs");
const userRouter = require("./routes/user");
const app = express();
const {connectMongoDB }= require("./connection");
const { logReqRes } = require("./middlewares/index");
const { log } = require("console");
const { fileURLToPath } = require("url");
const PORT = 3000;

connectMongoDB("mongodb://127.0.0.1:27017/my-first-db",()=>{
    console.log("mongodb connected");
});



//middleware to use urlencoded data as body
app.use(express.urlencoded({ extended: false }));


app.use(logReqRes("log.txt"))


app.use("/api/users",userRouter);

app.listen(PORT, () => { console.log(`Server running at PORT: ${PORT}`) })