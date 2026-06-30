const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const productCategoryRouter = require("./products-category.router");
const rolesRouter = require("./roles.router");
const accountRouter = require("./account.router");
const systemConfig = require("../../config/system");
const authRouter = require("./auth.router");
const myAccount = require("./my-account.router");
const settingsGeneralRouter = require("./settings-general.router");
const authMiddlewares = require("../../middlewares/admin/auth.middlewares");

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddlewares.requireAuth,
    dashboardRouter,
  );

  app.use(
    PATH_ADMIN + "/products",
    authMiddlewares.requireAuth,
    productsRouter,
  );

  app.use(
    PATH_ADMIN + "/products-category",
    authMiddlewares.requireAuth,
    productCategoryRouter,
  );

  app.use(PATH_ADMIN + "/roles", authMiddlewares.requireAuth, rolesRouter);

  app.use(PATH_ADMIN + "/accounts", authMiddlewares.requireAuth, accountRouter);

  app.use(PATH_ADMIN + "/auth", authRouter);
  app.use(PATH_ADMIN + "/my-account", authMiddlewares.requireAuth, myAccount);

  app.use(
    PATH_ADMIN + "/settings",
    authMiddlewares.requireAuth,
    settingsGeneralRouter,
  );
};
