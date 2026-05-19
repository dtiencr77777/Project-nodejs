module.exports.requireAuth = (req, res, next) => {
  if (!req.cookies.token) {
    res.redirect("/admin/auth/login");
  } else {
    console.log("token: ", req.cookies.token);
    next();
  }
};
