const systemConfig = require("../../config/system");

const ProductCategory = require("../../models/product-category.model");
//  GET /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const productCategory = await ProductCategory.find(find);
  res.render("admin/pages/product-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: productCategory,
  });
};

//  GET /admin/products-category/create
module.exports.create = (req, res) => {
  res.render("admin/pages/product-category/create.pug", {
    pageTitle: "Products-category Create",
  });
};

//  POST /admin/products-category/create

module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const coutProductCategory = await ProductCategory.countDocuments();
    req.body.position = coutProductCategory + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  //  record : bản ghi, thay cho productcategory
  const record = new ProductCategory(req.body);
  await record.save();
  console.log(req.body);
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};
