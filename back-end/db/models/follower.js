const mongoose = require("mongoose");

const { Schema } = mongoose;

const followerSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    follower: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Follower", followerSchema);
