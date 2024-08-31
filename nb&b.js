const fs = require("fs");
const os = require("os");

console.log(1)
console.log(os.cpus().length)
//blocking operations
// const hello = fs.readFileSync("./text.txt", "utf-8")

// non blocking operations
fs.readFile("./text.txt", "utf-8" , (error,result)=> {
    if(error){
     throw error;
    }
    else{
        console.log(result)
    }
})


 console.log(2)


