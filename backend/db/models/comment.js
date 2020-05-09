const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    body: { type: String, required: true, maxlength: 500 },
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    post_id: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
