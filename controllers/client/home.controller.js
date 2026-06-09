const Product = require("../../models/product.model");
const priceNewHelper = require("../../helpers/product");
// GET /home
module.exports.index = async (req, res) => {
  //1  lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    // deleted: false,
    // status: "active",
  });
  const Products = priceNewHelper.priceNew(productsFeatured);
  // console.log(Products);
  //2   hiển thị danh sách sản phẩm mới nhất
  const productsNew = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({ position: "desc" })
    .limit(6);
  // 2end  hiển thị danh sách sản phẩm mới nhất

  res.render("client/pages/home/index.pug", {
    pageTitle: "Home Page",
    productsFeatured: Products,
    productsNew: productsNew,
  });
};
