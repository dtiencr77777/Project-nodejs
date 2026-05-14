module.exports.login = (req, res, next) => {
  // validate dữ liệu
  if (!req.body.email) {
    req.flash("error", "Email không được để trống");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  if (!req.body.password) {
    req.flash("error", "Mật khẩu không được để trống");
    res.redirect(req.get("Referrer") || "/");
    return;
  }

  //
  next();
};
