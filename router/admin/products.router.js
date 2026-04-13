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
const validate = require("./../../validates/admin/product.validate");
// controller
const controler = require("../../controllers/admin/products.controller");

router.get("/", controler.index);

router.patch("/change-status/:status/:id", controler.changeStatus);

router.patch("/change-multi", controler.changeMulti);

router.delete("/delete/:id", controler.deleteItem);
// tạo sản phẩm
router.get("/create", controler.create);
// xử lý tạo sản phẩm
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloudRouter.uploadCloud,

  validate.createProducts,
  controler.createPost,
);
// edit san pham

router.get("/edit/:id", controler.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  validate.createProducts,
  controler.editPatch,
);
//  detail sản phẩm

router.get("/detail/:id", controler.detail);

module.exports = router;
