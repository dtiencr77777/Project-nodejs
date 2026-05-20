const Account = require("../../models/account.model");
const Role = require("../../models/roles.models");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect("/admin/auth/login");
  } else {
    const user = await Account.findOne({ token: req.cookies.token }).select(
      "-password -token",
    );
    if (!user) {
      res.redirect("/admin/auth/login");
    } else {
      // console.log("token: ", req.cookies.token);
      const role = await Role.findOne({
        _id: user.role_id,
      });
      res.locals.user = user;
      res.locals.role = role;
      next();
    }
  }
};
