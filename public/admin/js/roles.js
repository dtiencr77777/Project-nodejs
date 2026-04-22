console.log("roles js");
//  Phần permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissionsData = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    console.log(rows);
  });
}
// end permissions
