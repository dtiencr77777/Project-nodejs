const Chat = require("../../models/chat.model");
// GET : /chat
module.exports.index = async (req, res) => {
  const userId = req.locals.user.id;

  // socket.io
  _io.on("connection", (socket) => {
    // console.log("a user connected", socket.id);
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      // lưu vào database
      const chat = new Chat({
        user_id: userId,
        content: content,
      });
      await chat.save();
    });
  });

  res.render("client/pages/chat/index", {
    pageTitle: "Chat",
  });
};
