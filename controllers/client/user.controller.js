const md5 = require("md5");
const User = require("../../models/user.model");
// GET : user/regiter
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký",
  });
};

// POST : user/regiter
module.exports.registerPost = async (req, res) => {
  console.log(req.body);
  const exitsEmail = await User.findOne({
    email: req.body.email,
  });
  if (exitsEmail) {
    req.flash("error", "Email đã tồn tại");
    res.redirect("/user/register");
    return;
  }
  req.body.password = md5(req.body.password);
  const user = new User(req.body);
  await user.save();
  req.flash("success", "Đăng ký thành công");
  // console.log(user);
  // lưu tokenUser vào cookie
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};

// GET : user/login
module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập",
  });
};

// POST user/login
module.exports.loginPost = async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const password = md5(req.body.password);

  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("/user/login");
    return;
  }
  if (password !== user.password) {
    req.flash("error", "Mật khẩu không đúng");
    res.redirect("/user/login");
    return;
  }
  if (user.status == "inactive") {
    req.flash("error", "Tài khoản đã bị khóa");
    res.redirect("/user/login");
    return;
  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};
