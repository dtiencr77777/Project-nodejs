//  GET admin/auth/login
const Account = require("./../../models/account.model.js");
module.exports.login = (req, res) => {
  res.render("admin/pages/auth/login", {
    pageTitle: "Login",
  });
};

//  GET admin/auth/login

module.exports.loginPost = async (req, res) => {
  console.log(req.body);
  // const { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;
  const user = await Account.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect(req.get("Referrer") || "/");

    return;
  }
  res.send("");
};
