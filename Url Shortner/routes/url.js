const express = require("express");
const {HandlePostReqByUser, handleAllGetUsers,countClicks,} =require("../controllers/url");
const router = express.Router();


router.post("/",HandlePostReqByUser);

router.get("/:shortid",handleAllGetUsers);

router.get("/analytics/:shortId",countClicks);



module.exports= router;