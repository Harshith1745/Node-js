const express = require("express");
const router = express.Router();
const { handleAllGetUsers, handleGetUserById, postUser, patchUser, deleteUser } = require("../controllers/user");
const User = require("../models/user");



router.route("/")
    .get(handleAllGetUsers)
    .post(postUser);


router.route("/:id")
    .get(handleGetUserById)
    .patch(patchUser)
    .delete(deleteUser);

module.exports = router;