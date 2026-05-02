const Account = require("../../models/account.model");

//  GET /admin/accounts
module.exports.accountsDashboard = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find);
  res.render("admin/pages/accounts/index", {
    pageTitle: "Acounts DashBoard",
  });
};

//  Get /admin/accounts/create
module.exports.create = (req, res) => {
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Tạo tài khoản",
  });
};

//  POST /admin/accounts/create
module.exports.create = async (req, res) => {
  console.log(req.body);
  const record = new Account(req.body);
  await record.save();
  res.redirect("/admin/accounts");
};
