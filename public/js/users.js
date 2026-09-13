console.log("users.js loaded");
// chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");
if (listBtnAddFriend.length > 0) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      const userId = button.getAttribute("btn-add-friend");
      // console.log("User ID:", userId);
      // console.log(button.closest(".box-user"));
      button.closest(".box-user").classList.add("add");
      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}

// end chức năng gửi yêu cầu

// chức năng hủy yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");
if (listBtnCancelFriend.length > 0) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Cancel friend button clicked");
      // console.log("User ID:", userId);
      // console.log(button.closest(".box-user"));
      button.closest(".box-user").classList.remove("add");
      const userId = button.getAttribute("btn-cancel-friend");

      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// end chức năng hủy yêu cầu
// ham xoa loimoikb

const refuseFriend = (button) => {
  button.addEventListener("click", () => {
    console.log("Accept friend button clicked");
    button.closest(".box-user").classList.add("accept");
    const userId = button.getAttribute("btn-accept-friend");
    socket.emit("CLIENT_ACCEPT_FRIEND", userId);
  });
};
// chức năng xóa lời mời kb
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0) {
  listBtnRefuseFriend.forEach((button) => {
    refuseFriend(button);
  });
}
// end chức năng xóa lời mời kb

// chức năng chấp nhận lời mời kb
const acceptFriend = (button) => {
  button.addEventListener("click", () => {
    console.log("Accept friend button clicked");
    // console.log("User ID:", userId);
    // console.log(button.closest(".box-user"));
    button.closest(".box-user").classList.add("accept");
    const userId = button.getAttribute("btn-accept-friend");

    socket.emit("CLIENT_ACCEPT_FRIEND", userId);
  });
};

const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAcceptFriend.length > 0) {
  listBtnAcceptFriend.forEach((button) => {
    acceptFriend(button);
  });
}
// end chức năng chấp nhận lời mời kb

// SERRVER_RETURN_LECNGTH_ACCEPT_FRIENDS
const badgeUserAccept = document.querySelector("[badge-user-accept]");

if (badgeUserAccept) {
  const userId = badgeUserAccept.getAttribute("badge-user-accept");

  socket.on("SERRVER_RETURN_LECNGTH_ACCEPT_FRIENDS", (data) => {
    console.log(data);
    if (userId == data.userId) {
      badgeUserAccept.innerHTML = data.lengthAcceptFriends;
    }
  });
}
// END SERVER_RETURN_LECNGTH_ACCEPT_FRIENDS

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
  //1/  trang lời mời đã nhận

  const dataUsersAccept = document.querySelector("[data-users-accept]");
  if (dataUsersAccept) {
    const userId = dataUsersAccept.getAttribute("data-users-accept");
    if (userId == data.userId) {
      const div = document.createElement("div");
      div.classList.add("col-6");
      div.setAttribute("user-id", data.infoUserA._id);
      div.innerHTML = `
        <div class="box-user">
          <div class="inner-avatar">
            <img src="/images/avatar.png" alt="${data.infoUserA.fullName}">
          </div>
          <div class="inner-info">
            <div class="inner-name">Le Van A</div>
            <div class="inner-buttons">
              <button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infoUserA._id}">Chấp nhận</button>
              <button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="652ff407af643d08c31eaaf9">Xóa</button>
              <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="" disabled="">Đã xóa</button>
              <button class="btn btn-sm btn-primary mr-1" btn-accepted-friend="" disabled="">Đã chấp nhận</button>
            </div>
          </div>
        </div>
      `;
      dataUsersAccept.appendChild(div);

      // bắt sự kiện hủy lời mời kb
      const buttonRefuse = div.querySelector("[btn-refuse-friend]");
      refuseFriend(buttonRefuse);
      // end bắt sự kiện hủy lời mời kb

      //  bắt sự kiện chấp nhận lời mời kb
      const buttonAccept = div.querySelector("[btn-accept-friend]");
      acceptFriend(buttonAccept);
      // end bắt sự kiện chấp nhận lời mời kb
    }
  }
  // end 1/  trang lời mời đã nhận

  // 2 trang danh sách bạn bè
  const dataUsersNotFriend = document.querySelector("[data-users-not-friend]");
  if (dataUsersNotFriend) {
    const userId = dataUsersNotFriend.getAttribute("data-users-not-friend");
    if (userId === data.userId) {
      const boxUserRemove = dataUsersNotFriend.querySelector(
        `[user-id="${data.infoUserA._id}"]`,
      );
      if (boxUserRemove) {
        dataUsersNotFriend.removeChild(boxUserRemove);
      }
    }
  }
});

// END SERVER_RETURN_INFO_ACCEPT_FRIEND

//  server return user id cancel friend)
socket.on("SERVER_RETURN_USER_ID_CANCEL_FRIEND", (data) => {
  const userIdA = data.userIdA;
  const boxUserRemove = document.querySelector(`[user-id="${userIdA}"]`);
  if (boxUserRemove) {
    const dataUsersAccept = document.querySelector("[data-users-accept]");
    const userIdB = badgeUserAccept.getAttribute("badge-user-accept");
    if (userIdB == data.userIdB) {
      dataUsersAccept.removeChild(boxUserRemove);
    }
  }
});
// end server return user id cancel friend

//3 server return user online
socket.on("SERVER_RETURN_USER_ONLINE", (userId) => {
  const dataUserFriendOnline = document.querySelector(
    "[data-users-friend-online]",
  );
  if (dataUserFriendOnline) {
    const boxUser = dataUserFriendOnline.querySelector(`[user-id="${userId}"]`);
    if (boxUser) {
      const boxStatus = boxUser.querySelector("[status]");
      boxStatus.setAttribute("status", "online");
    }
  }
});

//end server return user online
