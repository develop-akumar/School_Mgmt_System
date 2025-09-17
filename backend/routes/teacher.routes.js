const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth.middleware")

const {
  createTeacher,
  getTeacher,
  deleteTeacher,
  updateTeacher,
} = require("../controllers/teacher.controller");

router.post("/", authenticateJWT, createTeacher);
router.get("/", getTeacher);
router.delete("/:id", authenticateJWT, deleteTeacher);
router.put("/:id", authenticateJWT, updateTeacher);

module.exports = router;
