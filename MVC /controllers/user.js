const User = require("../models/user")

async function handleAllGetUsers(req, res) {
    const allUsers = await User.find({});
    return res.status(200).json(allUsers);
}

async function handleGetUserById(req, res) {
    const id = req.params.id;
    const allUsers = await User.find({});


    const user = await User.findById(id);
    if (!user) {
        return res.status(404).send("Failed doesnot exist!");
    }


    return res.status(200).json(user);
}

async function postUser(req, res) {
    const body = req.body;


    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {

        res.status(400).json("All fields are required!");
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title,
    });
    console.log(result);
    res.status(201).json("data added successfully")

}

async function patchUser(req, res) {

    const id = req.params.id;
    const body = req.body;

    User.findByIdAndUpdate(id, body, { new: true }) // Return the updated document
        .then(updatedUser => {
            if (!updatedUser) {
                return res.status(404).send("Failed: User not found!");
            }

            return res.status(200).json(updatedUser);
        })
        .catch(err => {
            console.error("Error updating user:", err);
            return res.status(500).send("Internal Server Error");
        });
}

async function deleteUser(req, res) {
    const id = req.params.id;

    User.findByIdAndDelete(id);
    res.status(200).send("successful deletion of id" + User)

    if (!user) {
        return res.status(404).send("Failed doesnot exist!");
    }
}

module.exports = { handleAllGetUsers, handleGetUserById, postUser, patchUser, deleteUser, }