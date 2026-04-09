// BUTTON ACTIVE
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  const url = new URL(window.location.href);
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      // console.log(status);
      if (status) {
        url.searchParams.set("status", status);
        // console.log(url.href);
        window.location.href = url.href;
      } else {
        url.searchParams.delete("status");
        window.location.href = url.href;
      }
    });
  });
}
// END BUTTON ACTIVE

// form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  const url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target.keyword.value);
    const keyword = e.target.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
      window.location.href = url.href;
    } else {
      url.searchParams.delete("keyword");
      window.location.href = url.href;
    }
  });
}
//end form search

// 3 pagination Page

const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    // console.log(button);
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      console.log(page);
      url.searchParams.set("page", page);
      window.location.href = url.href;
    });
  });
}
// End pagination Page

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

// upload image preview
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]",
  );

  uploadImageInput.addEventListener("change", (e) => {
    console.log(e);
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}

//  7 SORT

const sort = document.querySelector("[sort]");
if (sort) {
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");
  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const [sortKey, sortValue] = value.split("-");
    // console.log(value.split("-"));
    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);
    window.location.href = url.href;
  });

  // clear sort
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");
    window.location.href = url.href;
  });
}
