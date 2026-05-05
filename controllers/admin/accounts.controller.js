const Account = require("../../models/account.model");
const Role = require("../../models/roles.models");

const md5 = require("md5");
//  GET /admin/accounts
module.exports.accountsDashboard = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Account.find(find).select("-password -token");
  console.log(records);
  res.render("admin/pages/accounts/index", {
    pageTitle: "Acounts DashBoard",
    records: records,
  });
};

//  Get /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });
  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Tạo tài khoản",
    roles: roles,
  });
};

//  POST /admin/accounts/create
module.exports.createPost = async (req, res) => {
  // console.log(req.body);
  const emailExits = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (emailExits) {
    req.flash("error", "Email đã tồn tại, vui lòng nhập lại email khác");
    res.redirect(req.get("Referrer") || "/");
  } else {
    req.body.password = md5(req.body.password);
    const record = new Account(req.body);
    await record.save();
    res.redirect("/admin/accounts");
  }
};
