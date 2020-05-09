const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    post_id: { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Like', likeSchema);
