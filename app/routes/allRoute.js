const defaultRoute = require("./defaultRoute");
const usersRoute = require("./usersRoute");
const ordersRoute = require("./ordersRoute");
let appRoute = new Object();

/**check authentication for apis */
appRoute.initialize = app => {
  const authenticationMiddleware = async (req, res, next) => {
    return next();
  };

  /** default route*/
  app.use("/", authenticationMiddleware, defaultRoute);

  /**user route */
  app.use("/users", authenticationMiddleware, usersRoute);
  
  /**orders */
  app.use("/orders", authenticationMiddleware, ordersRoute);
};

module.exports = appRoute;
