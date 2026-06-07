const Product = require("../../models/product.model");

// GET /home
module.exports.index = async (req, res) => {
  // lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
  });
  console.log(productsFeatured);
  res.render("client/pages/home/index.pug", {
    pageTitle: "Home Page",
    productsFeatured: productsFeatured,
  });
};
