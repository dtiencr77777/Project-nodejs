module.exports.createProducts = (req, res, next) => {
  // validate dữ liệu
  if (!req.body.title) {
    req.flash("error", "Vui lòng điền đầy đủ thông tin danh mục");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  //
  next();
};
