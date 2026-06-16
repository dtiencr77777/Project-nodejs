const Cart = require("../../models/cart.model");
module.exports.cartId = async (req, res, next) => {
  // console.log(req.cookies.cartId);
  if (!req.cookies.cartId) {
    // chưa có thì phải tạo
    const cart = new Cart();
    await cart.save();
    const expriresCookie = 1000 * 60 * 60;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expriresCookie),
    });
  } else {
    // có rồi chỉ cần lấy ra thôi
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });
    // console.log(cart);
    cart.totalQuantity = cart.products.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
    // console.log(totalQuantity);
    res.locals.miniCart = cart;
  }
  next();
};
