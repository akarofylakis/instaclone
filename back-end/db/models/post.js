const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    image_url: { type: String, required: true },
    caption: { type: String, maxlength: 500 },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    likes_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
