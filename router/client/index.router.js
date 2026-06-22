const ProuctRouter = require("./product.router");
const HomeRouter = require("./home.router");
const SearchRouter = require("./search.router");
const CartRouter = require("./cart.router");
const CheckoutRouter = require("./checkout.router");
const UserRouter = require("./user.router");

const categoryMiddleware = require("../../middlewares/client/caterogy.middlewares");
const cartMiddleware = require("../../middlewares/client/cart.middlewares");
module.exports = (app) => {
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use("/", HomeRouter);
  app.use("/products", ProuctRouter);
  app.use("/search", SearchRouter);
  app.use("/cart", CartRouter);
  app.use("/checkout", CheckoutRouter);
  app.use("/user", UserRouter);
};
