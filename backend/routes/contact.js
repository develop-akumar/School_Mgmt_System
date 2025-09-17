const express = require("express")
const router = express.Router()
const {createContact, getContacts, deleteContact} = require("../controllers/contact")
const authenticateJWT = require("../middleware/auth.middleware")

router.post("/", createContact)
router.get("/",authenticateJWT, getContacts)
router.delete("/:id", deleteContact)

module.exports = router
