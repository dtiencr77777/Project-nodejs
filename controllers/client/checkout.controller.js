// get : checkout
module.exports.index = async (req, res) => {
  res.render("client/pages/checkout/index", {
    pageTitle: "Đặt hàng",
  });
};
