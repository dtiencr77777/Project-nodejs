// 1.search
const Product = require("../../models/product.model");
const ProductNewPriceHELPER = require("../../helpers/product");
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  let newProduct = [];
  if (keyword) {
    const regex = new RegExp(keyword, "i");
    const products = await Product.find({
      title: regex,
      // deleted: false,
    });
    newProduct = ProductNewPriceHELPER.priceNew(products);
  }
  res.render("client/pages/search/index", {
    pageTitle: "Kết quả tìm kiếm",
    keyword: keyword,
    products: newProduct,
  });
};
