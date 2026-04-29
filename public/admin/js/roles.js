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

// permissions data default
const dataReocords = document.querySelector("[data-records]");
if (dataReocords) {
  const records = JSON.parse(dataReocords.getAttribute("data-records"));
  // console.log(records);

  records.forEach((records, index) => {
    const permissions = records.permissions;
    permissions.forEach((permissions) => {
      const row = tablePermissions.querySelector(
        `[data-name="${permissions}"]`,
      );
      const input = row.querySelectorAll("input")[index];
      // console.log(permissions);
      input.checked = true;
    });
    // console.log("---------");
  });
}
//End permissions data default
