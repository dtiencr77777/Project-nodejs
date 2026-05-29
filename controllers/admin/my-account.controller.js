// get : admin/my-account

module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index.pug", {
    pageTitle: "My Account",
  });
};
