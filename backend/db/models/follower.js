const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const followerSchema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    follower_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Follower', followRelationshipSchema);
