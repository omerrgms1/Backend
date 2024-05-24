const express = require('express');
const { updatedUser, deleteUser, getUser, getAllUsers } = require('../controllers/user');
const { verifyToken, verifyUser, verifyAdmin } = require("../utils/verifyToken")

const router = express.Router();

//  router.get("/checkauthentication", verifyToken, (req, res, next) => {
//      res.send("hello user,you are logged in!");
//  })
//  router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//      res.send("hello user,you are logged in and you can delete you account");
//  })
//  router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("hello admin, you are logged in and you can delete all accounts");
// })

//UPDATE
router.put("/:id",verifyUser, updatedUser);
//DELETE
router.delete("/:id",verifyUser, deleteUser);
//GET
router.get("/:id",verifyUser, getUser)
//GET ALL
router.get("/",verifyAdmin, getAllUsers)



module.exports = router