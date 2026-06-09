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
  res.send("slugCategory: " + slug);
};
