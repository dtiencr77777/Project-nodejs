const Cart = require("../../models/cart.model");

// [POST]  /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = req.body.quantity;
  const cartId = req.cookies.cartId;
  console.log(cartId);
  console.log(productId);
  console.log(quantity);
  const objectCart = {
    product_id: productId,
    quantity: quantity,
  };
  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      $push: { products: objectCart },
    },
  );
  req.flash("success", "Đã thêm vào giỏ hàng");
  res.redirect(req.get("Referrer") || "/");
};
