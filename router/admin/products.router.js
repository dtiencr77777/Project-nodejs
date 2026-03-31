const express = require("express");
const router = express.Router();
//  Hiển thị ảnh sản phẩm
const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

const controler = require("../../controllers/admin/products.controller");

router.get("/", controler.index);

router.patch("/change-status/:status/:id", controler.changeStatus);

router.patch("/change-multi", controler.changeMulti);

router.delete("/delete/:id", controler.deleteItem);
// tạo sản phẩm
router.get("/create", controler.create);
// xử lý tạo sản phẩm
router.post("/create", upload.single("thumbnail"), controler.createPost);

module.exports = router;
