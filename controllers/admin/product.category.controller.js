const systemConfig = require("../../config/system");

const ProductCategory = require("../../models/product-category.model");
//1  GET /admin/products-category
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const productCategory = await ProductCategory.find(find);
  res.render("admin/pages/product-category/index.pug", {
    pageTitle: "Danh mục sản phẩm",
    records: productCategory,
  });
};

//2  GET /admin/products-category/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  //  hàm tạo cây, đệ quy
  function createTree(arr, parentId = "") {
    const tree = [];
    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        const newItem = item;
        const children = createTree(arr, item._id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
  }

  const records = await ProductCategory.find(find);
  const newRecords = createTree(records);
  // console.log(records);
  console.log(newRecords);
  res.render("admin/pages/product-category/create.pug", {
    pageTitle: "Products-category Create",
    records: records,
  });
};

//2  POST /admin/products-category/create
module.exports.createPost = async (req, res) => {
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
