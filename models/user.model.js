const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const generate = require("../helpers/generate");

const userschema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
      type: String,
      default: generate.generateRamdomString(25),
    },
    phone: Number,
    avatar: String,
    status: {
      type: String,
      default: "active",
    },
    requestFriend: Array, // lời mời đã gửi
    acceptFriend: Array, // lời mời đã nhận
    friendList: [
      {
        user_id: String,
        // room_chat_id: String,
      },
    ],
    statusOnline: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true },
);
const User = mongoose.model("User", userschema, "users");

module.exports = User;
