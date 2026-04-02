module.exports.createProducts = (req, res, next) => {
  // validate dữ liệu
  if (!req.body.title) {
    req.flash("error", "Vui lòng nhập tên sản phẩm");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  //
  next();
};
