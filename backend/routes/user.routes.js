const express = require("express")
const router = express.Router()
const authenticateJWT = require("../middleware/auth.middleware");

const {createUser, getUser, deleteUser, updateUser, userLogin} = require("../controllers/user.controller")

router.post("/signup", createUser )
router.post("/login", userLogin)
router.get("/", authenticateJWT, getUser)
router.delete("/:id", authenticateJWT, deleteUser)
router.put("/:id", authenticateJWT, updateUser)


module.exports = router