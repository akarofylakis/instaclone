const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 55,
    },
    email: { type: String, required: true, uinque: true },
    password: { type: String, required: true, minlength: 6, maxlength: 500 },
    user_info: {
      fullname: { type: String, maxlength: 55 },
      summary: { type: String, maxlength: 500 },
      avatar_url: { type: String, maxlength: 500 },
    },
    posts_count: { type: Number, default: 0 },
    followers_count: { type: Number, default: 0 },
    following_count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
