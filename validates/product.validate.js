module.exports.createProducts = (req, res, next) => {
  // validate dữ liệu
  if (
    !req.body.title ||
    !req.body.price ||
    !req.body.discountPercentage ||
    !req.body.stock
  ) {
    req.flash("error", "Vui lòng điền đầy đủ thông tin sản phẩm");
    res.redirect(req.get("Referrer") || "/");
    return;
  }
  //
  next();
};
