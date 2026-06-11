const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helpers/product");

const productsCategorySlugHelper = require("../../helpers/products-category-slug.client");
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
  const slug = req.params.slugCategory;

  try {
    let find = {
      // deteled: false,
      // status:"active"
      slug: slug,
    };
    const product = await Product.findOne(find);

    // tìm category của product
    if (product.product_category_id) {
      const category = await ProductCategory.findOne({
        _id: product.product_category_id,
        // deleted: false,
      });
      product.category = category;
    }
    product.priceNew = productsHelper.priceNewProduct(product);

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

  const listSubCategory = await productsCategorySlugHelper.getSubCategory(
    category.id,
  );
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
