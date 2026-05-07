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

module.exports.editAccounts = (req, res, next) => {
  // validate dữ liệu
  if (!req.body.fullName || !req.body.email) {
    req.flash("error", "Vui lòng điền đầy đủ thông tin tài khoản");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  //
  next();
};
