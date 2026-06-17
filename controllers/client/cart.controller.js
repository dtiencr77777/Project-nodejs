const Cart = require("../../models/cart.model");

//  GET /cart/
module.exports.index = async (req, res) => {
  res.render("client/pages/cart/index", {
    pageTitle: "Giỏ hàng",
  });
};

// [POST]  /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;
  // console.log(cartId);
  // console.log(productId);
  // console.log(quantity);

  const cart = await Cart.findOne({
    _id: cartId,
  });

  const exitsProductInCart = cart.products.find(
    (item) => item.product_id == productId,
  );

  if (exitsProductInCart) {
    const quatityNew = quantity + exitsProductInCart.quantity;
    // console.log(quatityNew);
    await Cart.updateOne(
      {
        _id: cartId,
        "products.product_id": productId,
      },
      {
        $set: {
          "products.$.quantity": quatityNew,
        },
      },
    );
  } else {
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
  }
  req.flash("success", "Đã thêm vào giỏ hàng");
  res.redirect(req.get("Referrer") || "/");
};
