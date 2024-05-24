const User = require('../models/User')

const updatedUser = async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

const deleteUser = async (req, res) => {

    try {
        await User.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("User has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
}

const getUser = async (req, res) => {
    try {
        const selectedUser = await User.findById(
            req.params.id
        );
        res.status(200).json(selectedUser)
    } catch (err) {
        res.status(500).json(err)
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = { updatedUser, deleteUser, getUser, getAllUsers }