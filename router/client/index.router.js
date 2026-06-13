const ProuctRouter = require("./product.router");
const HomeRouter = require("./home.router");
const SearchRouter = require("./search.router");

const categoryMiddleware = require("../../middlewares/client/caterogy.middlewares");

module.exports = (app) => {
  app.use("/", categoryMiddleware.category, HomeRouter);
  app.use("/products", categoryMiddleware.category, ProuctRouter);
  app.use("/search", SearchRouter);
};
