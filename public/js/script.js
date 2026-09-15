console.log("Script file loaded.");
// show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
//end show alert

// Delect browser or tab closing
window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log("Browser or tab is closing.");
});
// end delete browser or tab closing
