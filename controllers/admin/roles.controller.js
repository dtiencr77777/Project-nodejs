const Role = require("../../models/roles.models");

//  GET /admin/roles
module.exports.rolesIndex = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Role.find(find);
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Roels",
    records: records,
  });
};

module.exports.create = (req, res) => {
  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Tạo nhóm quyền",
  });
};

module.exports.createPost = (req, res) => {
  console.log(req.body);
  const record = new Role(req.body);
  record.save();
  res.send("oke");
  res.redirect("/admin/roles");
};
