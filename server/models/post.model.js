const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
    },

    author: {
      type: String,
    },

    content: {
      type: String,
      required: [true, "Please add content"],
    },

    cover_photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
