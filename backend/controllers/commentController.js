const Comment = require("../models/Comment");

const addComment = async (req, res) => {
  try {
    const { videoId, text } = req.body;

    const newComment = new Comment({
      videoId,
      userId: req.user._id, 
      text,
    });

    const savedComment = await newComment.save();

    const populatedComment = await Comment.findById(savedComment._id).populate(
      "userId",
      "username"
    );

    res.status(201).json({
      success: true,
      data: populatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding comment",
      error: error.message,
    });
  }
};

const getVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.find({ videoId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching comments",
      error: error.message,
    });
  }
};

module.exports = {
  addComment,
  getVideoComments,
};
