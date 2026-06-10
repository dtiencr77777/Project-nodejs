const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helpers/product");
//  1 GET : products
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
//  2 GET : product/:slug
module.exports.slug = async (req, res) => {
  const slug = req.params.slug;

  try {
    let find = {
      // deteled: false,
      // status:"active"
      slug: slug,
    };
    const product = await Product.findOne(find);
    res.render("client/pages/products/detail.pug", {
      pageTitle: "Detail Page",
      product: product,
    });
  } catch (error) {
    res.redirect("/products");
  }
};

//  2 GET : product/:slugCategory
module.exports.category = async (req, res) => {
  const slug = req.params.slugCategory;
  const category = await ProductCategory.findOne({
    slug: slug,
    // deleted: false,
  });
  // console.log(category.id);

  // đệ quy lấy tất cả các category con
  const getSubCategory = async (parentId) => {
    const subs = await ProductCategory.find({
      parent_id: parentId,
      status: "active",
      // deleted: false,
    });
    let allSubs = [...subs];
    for (const sub of subs) {
      const childs = await getSubCategory(sub.id);
      allSubs = allSubs.concat(childs);
    }
    return allSubs;
  };
  getSubCategory(category.id);
  // end đệ quy

  const listSubCategory = await getSubCategory(category.id);
  const listSubCategoryId = listSubCategory.map((item) => item.id);
  const products = await Product.find({
    product_category_id: [category.id, ...listSubCategoryId],
    // deleted: false,
  }).sort({ position: "desc" });
  // console.log(products);

  const newProducts = productsHelper.priceNew(products);
  res.render("client/pages/products/index.pug", {
    pageTitle: category.title,
    products: newProducts,
  });
};
