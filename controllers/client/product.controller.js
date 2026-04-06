const Product = require("../../models/product.model");
module.exports.product = async (req, res) => {
  const products = await Product.find().sort({ position: "desc" });
  const newProducts = products.map((item) => {
    item.newPrice = (item.price * (100 - item.discountPercentage)) / 100;
    return item;
  });

  res.render("client/pages/products/index.pug", {
    pageTitle: "Products Page",
    products: newProducts,
  });
};

module.exports.slug = async (req, res) => {
  res.send("slug");
};
