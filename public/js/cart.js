console.log("helo");
// cập nhật lại số Lượng sp
const inputsQuantity = document.querySelectorAll("input[name='quantity']");
// console.log(inputsQuanti{ty);
if (inputsQuantity.length > 0) {
  inputsQuantity.forEach((input) => {
    input.addEventListener("change", (e) => {
      console.log(e.target.value);
    });
  });
}
