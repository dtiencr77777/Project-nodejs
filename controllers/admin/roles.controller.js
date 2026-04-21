//  GET /admin/roles
module.exports.rolesIndex = (req, res) => {
  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Roels",
  });
};
