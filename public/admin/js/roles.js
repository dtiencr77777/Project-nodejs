//  Phần permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    let permissionsData = [];
    const rows = tablePermissions.querySelectorAll("[data-name]");
    // console.log(rows);

    // --------------------
    rows.forEach((row) => {
      const name = row.getAttribute("data-name");
      // tìm các input trong hàng
      const inputs = row.querySelectorAll("input");
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value;
          permissionsData.push({
            id: id,
            permissionsData: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          // console.log(name, index, checked);
          // console.log("------------");
          if (checked) {
            permissionsData[index].permissionsData.push(name);
          }
        });
      }
    });
    // console.log(permissionsData);
    if (permissionsData.length > 0) {
      const formChangePermissions = document.querySelector(
        "#form-change-permissions",
      );
      const inputPermissions = formChangePermissions.querySelector(
        "input[name='permissions']",
      );
      // console.log(inputPermissions);;
      inputPermissions.value = JSON.stringify(permissionsData);
      formChangePermissions.submit();
    }
  });
}
// end permissions
