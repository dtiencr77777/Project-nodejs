const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next) => {
  // console.log(req.cookies.cartId);
  if (!req.cookies.cartId) {
    // chưa có thì phải tạo
    const cart = new Cart();
    await cart.save();
    res.cookie("cartId", cart.id);
  } else {
    // có rồi chỉ cần lấy ra thôi
  }
  next();
};
