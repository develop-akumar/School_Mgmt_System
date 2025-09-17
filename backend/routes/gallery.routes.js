const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth.middleware");

const {
  createGallery,
  getGallery,
  deleteGallery,
  updateGallery,
} = require("../controllers/gallery.controller");

router.post("/", authenticateJWT, createGallery);
router.get("/", getGallery);
router.delete("/:id", authenticateJWT, deleteGallery);
router.put("/:id", authenticateJWT, updateGallery);

module.exports = router;
