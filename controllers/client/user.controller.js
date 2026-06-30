const md5 = require("md5");
const User = require("../../models/user.model");
const Cart = require("../../models/cart.model");
// hafm ramdom otp
const generateOTP = require("../../helpers/generate");
const ForgotPassword = require("../../models/forgot-password.model");
// SendMail
const sendMailHelper = require("../../helpers/sendMail");
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

  //  thêm user vào Model : Cart
  const cart = await Cart.findOne({
    user_id: user.id,
  });

  if (cart) {
    res.cookie("cartId", cart.id);
  } else {
    await Cart.updateOne(
      {
        _id: req.cookies.cartId,
      },
      {
        user_id: user.id,
      },
    );
  }

  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/");
};

// GET : user/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("tokenUser");
  res.clearCookie("cartId");
  res.redirect("/");
};

// GET : user/password/forgot
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Quên mật khẩu",
  });
};

module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  // console.log(email);
  const user = await User.findOne({
    email: email,
    deleted: false,
  });
  if (!user) {
    req.flash("error", "Email không tồn tại");
    res.redirect("/user/password/forgot");
    return;
  }
  // lưu thông tin vào db
  const otp = generateOTP.generateRamdomNumber(6);
  const ojForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now(),
  };
  // console.log(ojForgotPassword);
  const forgotPassword = new ForgotPassword(ojForgotPassword);
  await forgotPassword.save();

  // nếu tồn tại email thì gửi mã OTP sang email
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
    Mã OTP để lấy lại mật khẩu là: ${otp}
  `;
  sendMailHelper.SendMail(email, subject, html);
  res.redirect(`/user/password/otp?email=${email}`);
};

// ===========================lấy mã otp
// GET : user/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  // console.log(email);
  res.render("client/pages/user/otp-password", {
    pageTitle: "Nhập mã OTP",
    email: email,
  });
};

// POST : user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
  // console.log(req.body);
  const email = req.body.email;
  const otp = req.body.otp;
  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });
  if (!result) {
    req.flash("error", "Mã OTP không đúng");
    res.redirect(`/user/password/otp?email=${email}`);
    return;
  }

  const user = await User.findOne({
    email: email,
    // deleted: false,
  });
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/user/password/reset");
};

// ==================================

// GET : user/password/reset
module.exports.resetPassword = async (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Đặt lại mật khẩu",
  });
};

// POST : user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const tokenUser = req.cookies.tokenUser;
  await User.updateOne(
    {
      tokenUser: tokenUser,
    },
    {
      password: md5(password),
    },
  );
  req.flash("success", "Đặt lại mật khẩu thành công");
  res.redirect("/");
};

// POST : user/info
module.exports.info = async (req, res) => {
  const tokenUser = req.cookies.tokenUser;
  const user = await User.findOne({
    tokenUser: tokenUser,
  }).select("-password");
  console.log(user);
  res.render("client/pages/user/info", {
    pageTitle: "Thông tin cá nhân",
    infoUser: user,
  });
};
