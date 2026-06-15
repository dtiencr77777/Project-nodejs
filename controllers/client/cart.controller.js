module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = req.body.quantity;
  console.log(productId, quantity);
  res.send("ok");
};
