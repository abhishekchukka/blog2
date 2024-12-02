const express = require("express");
const {
  getPosts,
  getPostById,
  addPost,
  deletePostById,
  getUserPosts,
} = require("../controllers/postsController");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", validateToken, addPost);
router.get("/user/:id", validateToken, getUserPosts);
router.delete("/:id", validateToken, deletePostById);
module.exports = router;
