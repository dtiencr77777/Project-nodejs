const Product = require("../../models/product.model");
const priceNewHelper = require("../../helpers/product");
// GET /home
module.exports.index = async (req, res) => {
  // lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active",
  });
  const Products = productsFeatured.map((item) => {
    item.newPrice = (item.price * (100 - item.discountPercentage)) / 100;
    return item;
  });
  console.log(Products);
  res.render("client/pages/home/index.pug", {
    pageTitle: "Home Page",
    productsFeatured: Products,
  });
};
