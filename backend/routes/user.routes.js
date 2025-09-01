const express = require("express")
const router = express.Router()

const {createUser, getUser, deleteUser, updateUser, userLogin} = require("../controllers/user.controller")

router.post("/signup", createUser )
router.post("/login", userLogin)
router.get("/", getUser)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)


module.exports = router