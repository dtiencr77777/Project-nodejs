// GET admin/settings/general
module.exports.general = (req, res) => {
  res.render("admin/pages/settings/general.pug", {
    pageTitle: "Cài đặt chung",
  });
};
