const User = require("../../models/user.model");

const userSocket = require("../../sockets/client/users.socket");

module.exports.notFriend = async (req, res) => {
  // SOCKET
  userSocket(res);
  // end socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });
  const requestFriend = myUser.requestFriend;
  const acceptFriend = myUser.acceptFriend;
  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriend } },
      { _id: { $nin: acceptFriend } },
    ],

    status: "active",
    deleted: false,
  }).select("id fullName");
  res.render("client/pages/users/not-friend", {
    title: "Not Friend",
    users: users,
  });
};

// GET REQUEST FRIEND user/request
module.exports.requestFriend = async (req, res) => {
  // SOCKET
  userSocket(res);
  // end socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });
  const requestFriend = myUser.requestFriend;
  const acceptFriend = myUser.acceptFriend;
  const users = await User.find({
    _id: { $in: requestFriend },

    status: "active",
    deleted: false,
  }).select("id fullName");
  res.render("client/pages/users/request", {
    title: "Request Friend",
    users: users,
  });
};

// GET ACCEPT FRIEND user/accept
module.exports.accept = async (req, res) => {
  // SOCKET
  userSocket(res);
  // end socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });
  const acceptFriend = myUser.acceptFriend;
  const users = await User.find({
    _id: { $in: acceptFriend },

    status: "active",
    deleted: false,
  }).select("id fullName");
  res.render("client/pages/users/accept", {
    title: "Accept Friend",
    users: users,
  });
};

// GET  user/friends
module.exports.friends = async (req, res) => {
  // SOCKET
  userSocket(res);
  // end socket

  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId,
  });
  const friendList = myUser.friendList;
  const friendListId = friendList.map((item) => item.user_id);

  const users = await User.find({
    _id: { $in: friendListId },

    status: "active",
    deleted: false,
  }).select("id fullName");
  res.render("client/pages/users/friends", {
    title: "Friends",
    users: users,
  });
};
