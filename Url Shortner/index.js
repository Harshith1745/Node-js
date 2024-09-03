const express = require("express");
const shortid = require("shortid");
const PORT = 3001;
const app = express();
const { mongoDBConnect } = require("./connection");


const router = require("./routes/url");
const URL = require("./models/url");



mongoDBConnect("mongodb://localhost:27017/short-url-gen");


app.use(express.json());

app.use("/url", router);

app.use("/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(

        { shortId, }
        , {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                }
            },
        }
    )
    return res.redirect(entry.redirectUrl);

})



app.listen(PORT, () => {
    console.log(`Server listening at PORT: ${PORT}`);
})


