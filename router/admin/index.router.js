const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const productCategoryRouter = require("./products-category.router");
const rolesRouter = require("./roles.router");
const accountRouter = require("./account.router");
const systemConfig = require("../../config/system");
const authRouter = require("./auth.router");

const authMiddlewares = require("../../middlewares/admin/auth.middlewares");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddlewares.requireAuth,
    dashboardRouter,
  );

  app.use(PATH_ADMIN + "/products", productsRouter);

  app.use(PATH_ADMIN + "/products-category", productCategoryRouter);

  app.use(PATH_ADMIN + "/roles", rolesRouter);

  app.use(PATH_ADMIN + "/accounts", accountRouter);

  app.use(PATH_ADMIN + "/auth", authRouter);
};
