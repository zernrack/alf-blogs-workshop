const express = require("express");
const upload = require("../middleware/uploadMiddleware.js");
const router = express.Router();

const {
  getAllPosts,
  createPost,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/post.controller.js");

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", upload.single("cover_photo"), createPost);
router.put("/:id", upload.single("cover_photo"), updatePost);
router.delete("/:id", deletePost);

module.exports = router;
