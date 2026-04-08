const express = require("express");
const router = express.Router();
//  Hiển thị ảnh sản phẩm
const multer = require("multer");
// const upload = multer({ dest: "./public/uploads/" });

//  cloudinary
// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({ storage: storageMulter() });
const upload = multer();

const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config({
  cloud_name: "dcoujkven",
  api_key: "558121248779264",
  api_secret: "YnRpvuwz74HVJesDSjkG41CaifE", // Click 'View API Keys' above to copy your API secret
});
//end  cloudinary

// validate dữ liệu
const validate = require("./../../validates/product.validate");
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
  function (req, res, next) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
    }

    upload(req);
  },
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
