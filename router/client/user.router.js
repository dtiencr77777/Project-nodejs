const express = require("express");
const router = express.Router();

const controler = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");
router.get("/register", controler.register);
router.post("/register", validate.regiterPost, controler.registerPost);
router.get("/login", controler.login);
router.post("/login", validate.loginPost, controler.loginPost);
router.get("/logout", controler.logout);
router.get("/password/forgot", controler.forgotPassword);
router.post(
  "/password/forgot",
  validate.forgotPasswordPost,
  controler.forgotPasswordPost,
);
//  nhập otp
router.get("/password/otp", controler.otpPassword);
router.post("/password/otp", controler.otpPasswordPost);

// lấy mật khẩu
router.get("/password/reset", controler.resetPassword);

module.exports = router;
