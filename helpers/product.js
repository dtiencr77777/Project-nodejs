module.exports.priceNew = (products) => {
  const Products = products.map((item) => {
    item.newPrice = (item.price * (100 - item.discountPercentage)) / 100;
    return item;
  });
  return Products;
};

module.exports.priceNewProduct = (products) => {
  const priceNew = (products.price * (100 - products.discountPercentage)) / 100;
  return parseInt(priceNew);
};
