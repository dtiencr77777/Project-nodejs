const express = require("express");
const router = express.Router();

//  Hiển thị ảnh sản phẩm
const multer = require("multer");
// const upload = multer({ dest: "./public/uploads/" });

//  cloudinary
// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({ storage: storageMulter() });
const upload = multer();
const uploadCloudRouter = require("../../middlewares/admin/uploadCloud.middlewares");
//end  cloudinary
// validate dữ liệu
const validate = require("./../../validates/admin/account.validate");
// controller
const controler = require("../../controllers/admin/accounts.controller");

router.get("/", controler.accountsDashboard);
router.get("/create", controler.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloudRouter.uploadCloud,
  validate.createAccounts,
  controler.createPost,
);

module.exports = router;
