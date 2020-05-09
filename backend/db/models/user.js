const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

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
      fullname: { type: String, required: true, maxlength: 55 },
      summary: { type: String, maxlength: 500 },
      avatar_url: { type: String, maxlength: 500 },
      location_id: { type: mongoose.Types.ObjectId, ref: 'Location' },
    },
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
