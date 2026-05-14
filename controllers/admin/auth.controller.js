const Account = require("./../../models/account.model.js");
const md5 = require("md5");
//  GET admin/auth/login

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

  if (md5(password) !== user.password) {
    req.flash("error", "Mật khẩu không đúng");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  if (user.status === "inactive") {
    req.flash(
      "error",
      "Tài khoản của bạn đã bị khóa, vui lòng liên hệ quản trị viên để biết thêm chi tiết",
    );
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  res.redirect("/admin/accounts");
};
