const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
// GET /home
module.exports.index = async (req, res) => {
  const productsCategory = await ProductCategory.find({
    deleted: false,
  });
  const newProductsCategory = createTreeHelper.tree(productsCategory);
  res.render("client/pages/home/index.pug", {
    pageTitle: "Home Page",
    layoutProductsCategory: newProductsCategory,
  });
};
