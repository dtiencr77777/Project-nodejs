//  GET /admin/products-category
module.exports.index = (req, res) => {
  res.render("admin/pages/product-category/index.pug");
};

//  GET /admin/products-category/create
module.exports.create = (req, res) => {
  res.render("admin/pages/product-category/create.pug", {
    pageTitle: "Products-category Create",
  });
};
