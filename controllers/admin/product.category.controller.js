const systemConfig = require("../../config/system");

const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/createTree");
//1  GET /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  // //  hàm tạo cây, đệ quy
  // function createTree(arr, parentId = "") {
  //   const tree = [];
  //   arr.forEach((item) => {
  //     if (item.parent_id == parentId) {
  //       const newItem = item;
  //       const children = createTree(arr, item.id);
  //       if (children.length > 0) {
  //         newItem.children = children;
  //       }
  //       tree.push(newItem);
  //     }
  //   });
  //   return tree;
  // }

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);
  res.render("admin/pages/product-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: newRecords,
  });
};

//2  GET /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  //  hàm tạo cây, đệ quy
  // function createTree(arr, parentId = "") {
  //   const tree = [];
  //   arr.forEach((item) => {
  //     if (item.parent_id == parentId) {
  //       const newItem = item;
  //       const children = createTree(arr, item.id);
  //       if (children.length > 0) {
  //         newItem.children = children;
  //       }
  //       tree.push(newItem);
  //     }
  //   });
  //   return tree;
  // }

  const records = await ProductCategory.find(find);
  const newRecords = createTreeHelper.tree(records);

  // console.log(records);
  console.log(newRecords);
  res.render("admin/pages/product-category/create.pug", {
    pageTitle: "Products-category Create",
    records: newRecords,
  });
};

//2  POST /admin/products-category/create
module.exports.createPost = async (req, res) => {
  // const permissiton = res.locals.role.permissions;
  // if (permissiton.includes("product-category_create")) {
  //   // User has permission to create product categories
  //   console.log(" cos quyen tao san pham");
  // } else {
  //   // User does not have permission
  //   res.status(403).send("Forbidden");
  //   return;
  // }

  if (req.body.position == "") {
    const coutProductCategory = await ProductCategory.countDocuments();
    req.body.position = coutProductCategory + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  //  record : bản ghi, thay cho productcategory
  const record = new ProductCategory(req.body);
  await record.save();
  console.log(req.body);
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

//3  GET /admin/products-category/edit
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    let find = {
      deleted: false,
      _id: id,
    };
    const records = await ProductCategory.find({
      deleted: false,
    });
    const newRecords = createTreeHelper.tree(records);

    const data = await ProductCategory.findOne(find);
    res.render("admin/pages/product-category/edit.pug", {
      pageTitle: "Products-category Edit",
      data: data,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
  }
};

//4  PATCH /admin/products-category/edit
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  req.body.position = parseInt(req.body.position);
  console.log(req.body);
  await ProductCategory.updateOne({ _id: id }, req.body);
  req.flash("success", "chỉnh sửa sản phẩm thành công");

  res.redirect(req.get("Referrer") || "/");
};
// tự làm các tính năng xoá sản phẩm, xem chi tiết sản phẩn
