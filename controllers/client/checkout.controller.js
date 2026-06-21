const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helpers/product");
const Order = require("../../models/orders");
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

// [POST] :checkout/order
module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  const products = [];
  for (const product of cart.products) {
    const ojProduct = {
      product_id: product.product_id,
      price: 0,
      quantity: product.quantity,
      discountPercentage: 0,
    };
    const productInfo = await Product.findOne({
      _id: product.product_id,
    }).select("price discountPercentage");
    ojProduct.price = productInfo.price;
    ojProduct.discountPercentage = productInfo.discountPercentage;
    products.push(ojProduct);
  }
  // console.log(cartId);
  // console.log(userInfo);
  // console.log(products);
  const orderInfo = {
    cart_id: cartId,
    userInfo: userInfo,
    products: products,
  };
  const order = new Order(orderInfo);
  order.save();
  await Cart.updateOne(
    {
      _id: cartId,
    },
    {
      products: [],
    },
  );
  res.send("ok");
};
