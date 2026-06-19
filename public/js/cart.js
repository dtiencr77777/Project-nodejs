console.log("helo");
// cập nhật lại số Lượng sp
const inputsQuantity = document.querySelectorAll("input[name='quantity']");
// console.log(inputsQuanti{ty);
if (inputsQuantity.length > 0) {
  inputsQuantity.forEach((input) => {
    input.addEventListener("change", (e) => {
      // console.log(e.target.value);
      const productId = input.getAttribute("product-id");
      const quantity = input.value;
      window.location.href = `/cart/update/${productId}/${quantity}`;
    });
  });
}
