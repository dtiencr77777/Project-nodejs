// get : checkout
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;
      const productInfo = await Product.findOne({
        _id: productId,
      }).select("title thumbnail slug price discountPercentage");

      productInfo.priceNew = productHelper.priceNewProduct(productInfo);

      item.productInfo = productInfo;
      item.totalPrice = item.productInfo.priceNew * item.quantity;
    }
  }
  // console.log(cart);
  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );
  res.render("client/pages/checkout/index", {
    pageTitle: "Giỏ hàng",
    cartDetail: cart,
  });
};
