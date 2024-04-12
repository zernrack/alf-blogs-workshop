const Post = require("../models/post.model.js");
const deleteFile = require("../utils/deleteFile.js");

// @desc Get All Post
// @route GET /posts
// access Public
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (error) {
    console.log("Error Fetch All posts:", error);
    throw new error(error.message);
  }
};

// @desc Get specific Post
// @route GET /posts/:id
// access Public
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(401).json({ error: "Post not found!" });
    }

    res.json(post);
  } catch (error) {
    console.log("Error Fetch All posts:", error);
    res.status(404).json({ error: "Post not found" });
  }
};

// @desc Create a post
// @route POST /post
// access Public
const createPost = async (req, res) => {
  // Validate Body
  if (!req.body) {
    res.status(400).json({ error: "No request body!" });
  }

  const { title, author, content } = req.body;

  const path = req.file?.path ?? null;

  try {
    const post = new Post({
      title,
      author,
      content,
      cover_photo: path,
    });

    const newPost = await post.save();

    if (newPost) {
      res.status(201).json(newPost);
    }
  } catch (error) {
    console.log("Error creating post:", error);
    res.status(401).json(error);
  }
};

// @desc Update a post
// @route PUT|PATCH /post/:id
// access Public
const updatePost = async (req, res) => {
  // Validate Body
  if (!req.body) {
    res.status(400).json({ error: "No request body!" });
  }

  const { id } = req.params;
  const { title, author, content } = req.body;

  // Optionally Check if req.file exists
  const path = req.file?.path ?? null;

  try {
    const originalPost = await Post.findbyId(id);

    if (originalPost.cover_photo && path) {
      deleteFile(originalPost.cover_photo);
    }
    if (!originalPost) {
      return res.status(404).json({ error: "Post not found!" });
    }

    // Update Fields
    originalPost.title = title;
    originalPost.author = author;
    originalPost.content = content;
    originalPost.cover_photo = cover_photo;

    const updatedPost = await originalPost.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log("Error creating post:", error);
    res.status(422).json(error);
  }
};

// @desc Delete specific Post
// @route DEL /posts/:id
// access Public
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(401).json({ error: "Post not found!" });
    }
    if (post) {
      deleteFile(post.cover_photo);
    }

    res.status(200).json({ message: "Delete post succesfully!" });
  } catch (error) {
    console.log("Error delete post:", error);
    res.status(404).json({ error: "Post not found" });
  }
};

module.exports = {
  getPost,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
