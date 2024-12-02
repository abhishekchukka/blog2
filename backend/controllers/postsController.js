const asyncHandler = require("express-async-handler");
const blogs = require("../models/blogModel");
//@desc Get all posts
//@route GET /api/posts
//@access Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await blogs.find();
  res.status(200).json(posts);
});
//@desc Get a posts
//@route GET /api/posts/id
//@access Public
const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const blog = await blogs.findById(postId);
  if (!blog) {
    res.status(404);
    throw new Error("Not found post");
  }
  res.status(200).json(blog);
});

//@desc Get posts by user ID
//@route GET /api/posts/user/:userId
//@access Private
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await blogs.find({ user_id: req.user.id });

  if (!posts) {
    res.status(404);
    throw new Error("No posts found for this user");
  }

  res.status(200).json(posts);
});

//@desc add a post
//@route POST /api/posts
//@access Public
const addPost = asyncHandler(async (req, res) => {
  const { title, content, author, tags, image } = req.body;
  if (!title || !content || !author || !tags) {
    res.status(400);
    throw new Error("All fields must be filled");
  }
  console.log(req.user);
  const blog = await blogs.create({
    title,
    content,
    author,
    tags,
    image,
    user_id: req.user.id,
  });
  res.status(201).json(blog);
});
//@desc Delete a post
//@route DELETE /api/posts/id
//@access Public
const deletePostById = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const blog = await blogs.findById(postId);
  if (!blog) {
    res.status(404);
    throw new Error("Not found post");
  }
  await blogs.findByIdAndDelete(postId);
  res.status(200).json({ message: `deleted a post ${postId}` });
});
module.exports = {
  getUserPosts,
  getPosts,
  getPostById,
  deletePostById,
  addPost,
};
