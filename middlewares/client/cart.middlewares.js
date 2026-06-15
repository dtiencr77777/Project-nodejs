const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next) => {
  // console.log(req.cookies.cartId);
  if (!req.cookies.cartId) {
    // chưa có thì phải tạo
    const cart = new Cart();
    await cart.save();
    const expriresCookie = 1000 * 30 * 60;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expriresCookie),
    });
  } else {
    // có rồi chỉ cần lấy ra thôi
  }
  next();
};
