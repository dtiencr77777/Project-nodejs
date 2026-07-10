const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
// GET : /chat
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  // socket.io
  _io.once("connection", (socket) => {
    // console.log("a user connected", socket.id);
    // " bỏ on dùng once thì chỉ load 1 lần, còn on thì load nhiều lần"
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // lưu vào database
      const chat = new Chat({
        user_id: userId,
        content: content,
      });
      await chat.save();
      //  trả data về cho client
      _io.emit("SERVER_RETURN_MESSAGE", {
        user_id: userId,
        content: content,
        fullName: fullName,
      });
    });

    // typing
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      // console.log(type);
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        user_id: userId,
        fullName: fullName,
        type: type,
      });
    });
    // end typing
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
