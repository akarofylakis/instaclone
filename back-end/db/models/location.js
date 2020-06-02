const mongoose = require("mongoose");

const { Schema } = mongoose;

const locationSchema = new Schema(
  {
    longtitude: { type: Number },
    latitude: { type: Number },
    city: { type: String, maxlength: 255 },
    country: { type: String, maxlength: 255 },
    user_id: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Location", locationSchema);
