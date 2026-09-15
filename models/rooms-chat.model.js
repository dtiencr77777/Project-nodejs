const mongoose = require("mongoose");
const RoomSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    permissions: {
      type: Array,
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    // hiển thị thời gian
    timestamps: true,
  },
);

const RoomChat = mongoose.model("RoomChat", RoomSchema, "rooms-chat");

module.exports = RoomChat;
