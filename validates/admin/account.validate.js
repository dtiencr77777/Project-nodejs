module.exports.createAccounts = (req, res, next) => {
  // validate dữ liệu
  if (!req.body.fullName || !req.body.email || !req.body.password) {
    req.flash("error", "Vui lòng điền đầy đủ thông tin tài khoản");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  //
  next();
};
