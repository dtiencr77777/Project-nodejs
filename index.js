const express = require("express");
const systemconfig = require("./config/system.js");

require("dotenv").config();

const app = express();
// 10 moment
const moment = require("moment");
app.locals.moment = moment;
// end 10
// 9 show thông báo
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
app.use(cookieParser("AHBCĐNDAER"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// end 9

// 8 RETURN BODY
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// 7 đè phương thức
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
// 6 locals Path Admin
app.locals.prefixAdmin = systemconfig.prefixAdmin;

// 5 Mongoose - kết nối với mongodb qua file config/database.js
const database = require("./config/database");
database.connect();

//  4 static file - css, js, image
app.use(express.static(`${__dirname}/public`));

// 3. dùng dotenv để quản lý biến môi trường - dong PORT trong file .env
const port = process.env.PORT;

//2. dùng pug làm view engine
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
// 10 tinymce
const path = require("path");

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce")),
);
// 1. dùng router
const routerClient = require("./router/client/index.router");
routerClient(app);
const routerAdmin = require("./router/admin/index.router");
routerAdmin(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
