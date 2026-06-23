module.exports.regiterPost = (req, res, next) => {
  if (!req.body.fullName) {
    res.flash("error", "Vui lòng điền đầy đủ thông tin tài khoản");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  if (!req.body.email) {
    res.flash("error", "Vui lòng điền đầy đủ thông tin tài khoản");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  if (!req.body.password) {
    res.flash("error", "Vui lòng điền đầy đủ thông tin tài khoản");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  next();
};
