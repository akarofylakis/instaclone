const mongoose = require("mongoose");

const { Schema } = mongoose;

const storySchema = new Schema(
  {
    source_url: { type: String, required: true, maxlength: 500 },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);
