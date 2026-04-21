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

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      _id: id,
      deleted: false,
    };
    const data = await Role.findOne(find);
    console.log(data);
    res.render("admin/pages/roles/edit.pug", {
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: data,
    });
  } catch (error) {
    req.flash("error", "Không tìm thấy nhóm quyền");
    res.redirect("/admin/roles");
  }
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  await Role.updateOne({ _id: id }, req.body);
  req.flash("success", "Cập nhật ");
  res.redirect("/admin/roles");
};
