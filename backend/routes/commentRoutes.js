const express = require("express");
const router = express.Router();
const {
  addComment,
  getVideoComments,
} = require("../controllers/commentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, addComment);
router.get("/:videoId", getVideoComments);

module.exports = router;
