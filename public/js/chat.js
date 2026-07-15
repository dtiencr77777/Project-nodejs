import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

const upload = new FileUploadWithPreview.FileUploadWithPreview("upload-images");
//  CLIENT SEND MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
// console.log(formSendData);

if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;
    console.log(content);
    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}

// end CLIENT SEND MESSAGE

// server return message
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  // console.log(data);
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const boxTyping = document.querySelector(".chat .inner-list-typing");

  const div = document.createElement("div");
  let htmlFullName = "";
  if (myId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }
  div.innerHTML = `
      ${htmlFullName}
      <div class="inner-content">${data.content}</div>

  `;
  // body.appendChild(div);
  body.insertBefore(div, boxTyping);
  bodyChat.scrollTop = bodyChat.scrollHeight;
});

// end  server return message

// Scroll to bottom : tự động cuộn xuong dưới khi có tin nhắn mới
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// end scroll to botton

//show  emoji picker
const buttonIcon = document.querySelector(".button-icon");
// console.log(buttonIcon);
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}
// end emoji picker
// ===============================================
// show typing
var timeOut;
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");
  clearTimeout(timeOut);
  // set khi dừng gõ
  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
};
// end show typing

//  insert emoji to input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name=content]",
  );
  emojiPicker.addEventListener("emoji-click", (e) => {
    // console.log(e.detail);

    const icon = e.detail.unicode;
    inputChat.value = inputChat.value + icon;
    inputChat.setSelectionRange(inputChat.value.length, inputChat.value.length);
    inputChat.focus();

    showTyping();
  });
  // input keyup
  inputChat.addEventListener("keyup", () => {
    showTyping();
  });
  // end input keyup
}
// end insert emoji to input

// SERVER_RETURN_TYPING
const elemtListTyping = document.querySelector(".chat .inner-list-typing");
if (elemtListTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    console.log(data);
    if (data.type == "show") {
      const existTyping = elemtListTyping.querySelector(
        `[user_id="${data.userId}"]`,
      );
      if (!existTyping) {
        const boxTying = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTying.setAttribute("user-id", data.userId);
        boxTyping.innerHTML = `
              <div class="inner-name">${data.fullName}</div>
              <div class="inner-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
      `;
        elemtListTyping.appendChild(boxTyping);
        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    } else {
      const boxTypingRemove = elemtListTyping.querySelector(
        `[user_id="${data.userId}"]`,
      );
      if (boxTypingRemove) {
        elemtListTyping.removeChild(boxTypingRemove);
      }
    }
  });
}

// end server
