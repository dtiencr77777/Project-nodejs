import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

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
    }
  });
}

// end CLIENT SEND MESSAGE

// server return message
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  // console.log(data);
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
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
  body.appendChild(div);
  bodyChat.scrollTop = bodyChat.scrollHeight;
});

// end  server return message

// Scroll to bottom : tự động cuộn xuong dưới khi có tin nhắn mới
const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat) {
  bodyChat.scrollTop = bodyChat.scrollHeight;
}
// end scroll to botton

//  emoji picker

const buttonIcon = document.querySelector("btn-icon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}
// end emoji picker
