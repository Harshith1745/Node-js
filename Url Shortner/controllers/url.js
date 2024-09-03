const express = require("express");
const shortid = require("shortid");
const URL = require("../models/url");



async function HandlePostReqByUser(req,res) {
    const body = req.body;
        if(!body.url){
            return res.status(400).json("Bad Request");
        }
        const id = shortid();
    await URL.create({
        shortId: id,
        redirectUrl: body.url,
        visitHistory: [{}],
    })

    res.status(200).json("short id: " +id);
}


async function handleAllGetUsers(req,res) {
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
}


async function countClicks(req,res) {
    const shortId = req.params.shortId
    const entry  = await URL.findOne({shortId});
    

    return res.status(200).json(`Number of clicks ${entry.visitHistory.length}  \n `)
}
module.exports = { HandlePostReqByUser,handleAllGetUsers,countClicks}; 