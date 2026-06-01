// get : admin/my-account

module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index.pug", {
    pageTitle: "My Account",
  });
};

module.exports.edit = (req, res) => {
  res.render("admin/pages/my-account/edit.pug", {
    pageTitle: "Edit My Account",
  });
};
