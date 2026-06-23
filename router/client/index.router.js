const ProuctRouter = require("./product.router");
const HomeRouter = require("./home.router");
const SearchRouter = require("./search.router");
const CartRouter = require("./cart.router");
const CheckoutRouter = require("./checkout.router");
const UserRouter = require("./user.router");

const categoryMiddleware = require("../../middlewares/client/caterogy.middlewares");
const cartMiddleware = require("../../middlewares/client/cart.middlewares");
// middlewares dành cho không hiển thị thanh header
const userMiddleware = require("../..//middlewares/client/user.middlewares");
module.exports = (app) => {
  // middlewares
  app.use(categoryMiddleware.category);
  app.use(cartMiddleware.cartId);
  app.use(userMiddleware.infoUser);
  // router
  app.use("/", HomeRouter);
  app.use("/products", ProuctRouter);
  app.use("/search", SearchRouter);
  app.use("/cart", CartRouter);
  app.use("/checkout", CheckoutRouter);
  app.use("/user", UserRouter);
};
