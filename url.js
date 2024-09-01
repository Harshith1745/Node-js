const http = require("http");
const fs = require("fs")
const url = require("url")

const startServer = http.createServer((req,res)=>{
    if(req.url == "/favicon.ico"){
        return res.end();
    }
    const log = `${Date.now()}: ${req.url}  new Req Received.\n`;
    const myUrl= url.parse((req.url),true)
    console.log(myUrl)
    fs.appendFile("log.txt", log , (err,data)=>{  
        switch(myUrl.pathname){
        case `/`: 
            res.end("Hello from the Server!");
            break;
        case `/about`:
            const search = myUrl.query.search
            res.end("Hi Welcome!! " +search);
            break;

        case '/search':
             const search_parameter = myUrl.query.search_params;
             res.end("Here are your search results about " +search_parameter);
             break;

        default:
            res.end("404 error not found");
            break; }
        })


    })

  startServer.listen(8000, ()=>{console.log("listening at 8000")})