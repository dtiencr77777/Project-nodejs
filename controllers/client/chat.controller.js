const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
// GET : /chat
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;

  // socket.io
  _io.on("connection", (socket) => {
    // console.log("a user connected", socket.id);
    // " bỏ on dùng once thì chỉ load 1 lần, còn on thì load nhiều lần"
    socket.once("CLIENT_SEND_MESSAGE", async (content) => {
      // lưu vào database
      const chat = new Chat({
        user_id: userId,
        content: content,
      });
      await chat.save();
    });
  });

  const chats = await Chat.find({
    deleted: false,
  });
  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName");
    chat.infoUser = infoUser;
  }
  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
    chats: chats,
  });
};
