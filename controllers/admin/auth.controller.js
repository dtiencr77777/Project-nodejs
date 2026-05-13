//  GET admin/auth/login

module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Login",
  });
};
