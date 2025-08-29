const express = require("express")
const router = express.Router()

const {createUser, getUser, deleteUser, updateUser} = require("../controllers/user.controller")

router.post("/", createUser )
router.get("/", getUser)
router.delete("/:id", deleteUser)
router.put("/:id", updateUser)

module.exports = router