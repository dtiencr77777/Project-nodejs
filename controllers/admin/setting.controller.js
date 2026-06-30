const SettingGeneral = require("../../models/settings-general.model");
// GET admin/settings/general
module.exports.general = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  res.render("admin/pages/settings/general.pug", {
    pageTitle: "Cài đặt chung",
    settingGeneral: settingGeneral,
  });
};

//PATCH admin/settings/general
module.exports.generalPatch = (req, res) => {
  const settingGeneral = new SettingGeneral(req.body);
  settingGeneral.save();
  res.redirect("/admin/settings/general");
};
