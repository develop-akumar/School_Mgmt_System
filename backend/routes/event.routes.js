const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth.middleware");

const {
  createEvent,
  getEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/event.controller");

router.post("/", authenticateJWT, createEvent);
router.get("/", getEvent);
router.delete("/:id", authenticateJWT, deleteEvent);
router.put("/:id", authenticateJWT, updateEvent);

module.exports = router;
