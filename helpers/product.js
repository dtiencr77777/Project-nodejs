module.exports.priceNew = (products) => {
  const Products = products.map((item) => {
    item.newPrice = (item.price * (100 - item.discountPercentage)) / 100;
    return item;
  });
  return Products;
};

module.exports.priceNewProduct = (products) => {
  product.priceNew = (product.price * (100 - product.discountPercentage)) / 100;
  return product;
};
