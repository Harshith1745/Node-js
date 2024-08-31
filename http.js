const http = require("http");
const fs = require("fs")


const startServer = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url}  new Req Received.\n`;
    //using nonblocking operations to avoid the downtime and overutilization of memory
    fs.appendFile("log.txt", log, (err, data) => {
        switch (req.url) {
            case `/`:
                res.end("Hello from the Server!");
                break;
            case `/about`:
                res.end("about the server : Harshith");
                break;
            default:
                res.end("404 error not found");
                break;
        }
    })

})

startServer.listen(8000, () => { console.log("listening at 8000") })