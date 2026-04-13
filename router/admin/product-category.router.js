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
const validate = require("./../../validates/product.validate");
const controler = require("../../controllers/admin/product.category.controller");

router.get("/", controler.index);
// tạo danh mục sản phẩm
router.get("/create", controler.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloudRouter.uploadCloud,
  validate.createProducts,
  controler.createPost,
);

module.exports = router;
