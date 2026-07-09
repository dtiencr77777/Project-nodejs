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
  const body = document.querySelector(".chat .inner-body");
  const div = document.createElement("div");
  div.classList.add("inner-incoming");
  div.innerHTML = `
      <div class="inner-name">${data.fullName}</div>
      <div class="inner-content">${data.content}</div>

  `;
  body.appendChild(div);
});

// end  server return message
