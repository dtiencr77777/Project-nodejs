const Account = require("../../models/account.model");

const md5 = require("md5");
// get : admin/my-account
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index.pug", {
    pageTitle: "My Account",
  });
};

module.exports.edit = (req, res) => {
  res.render("admin/pages/my-account/edit.pug", {
    pageTitle: "Edit My Account",
  });
};
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;
  const emailExits = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });
  if (emailExits) {
    req.flash("error", "Email đã tồn tại, vui lòng nhập lại email khác");
    res.redirect(req.get("Referrer") || "/");
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    await Account.updateOne({ _id: id }, req.body);
    res.redirect(req.get("Referrer") || "/");
  }
};
