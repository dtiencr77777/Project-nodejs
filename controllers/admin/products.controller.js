const Product = require("../../models/product.model");
const filerStatusHelper = require("../../helpers/filerStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

// [GET] /admin/products
module.exports.index = async (req, res) => {
  // console.log(req.query.status);

  // 1
  let find = {
    // deleted: false,
  };
  // filter status
  const filterStatus = filerStatusHelper(req.query);
  // end filter status

  if (req.query.status) {
    find.status = req.query.status;
  }
  // 2 tìm kiếm sản phẩm theo keyword
  const objectSearch = searchHelper(req.query);
  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }
  // 3 Pagination
  let objectPagination = await paginationHelper(req.query);

  // ==================================================================================
  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limitItem)
    .skip(objectPagination.skip);

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Products",
    productsPug: products,
    filterStatus: filterStatus,
    keyword: objectSearch.keyword,
    objectPagination: objectPagination,
  });
};

//4 PATCH /admin/products/change-status
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { status: status });
  // res.send(` ${status} with id ${id}`);
  // res.send("change status");
  req.flash("success", "Cập nhật trạng thái sản phẩm thành công");
  res.redirect(req.get("Referrer") || "/");
};

//4 PATCH /admin/products/changeMulti
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm`);

      break;

    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `Cập nhật thành công ${ids.length} sản phẩm`);

      break;

    case "deleted":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() },
      );
      req.flash("success", `Xoá mềm  thành công ${ids.length} sản phẩm`);

      break;
    case "change-position":
      // console.log(ids);
      for (const item of ids) {
        // console.log(item);
        // console.log(item.split("-"));
        let [id, position] = item.split("-");
        position = parseInt(position);
        // console.log(id);
        // console.log(position);

        await Product.updateOne({ _id: id }, { position: position });
        req.flash(
          "success",
          `thay đổi vị trí  thành công ${ids.length} sản phẩm`,
        );
      }
      break;
  }
  res.redirect(req.get("Referrer") || "/");
};

//5 DELETE /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  //  xoá vĩnh viễn
  // await Product.deleteOne({ _id: id });

  //  xoá mềm :
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() },
  );
  res.redirect(req.get("Referrer") || "/");
};

// 6 GET : admin/products/create
module.exports.create = (req, res) => {
  res.render("admin/pages/products/create.pug", {
    pageTitle: "Create Products",
  });
};

// 6 POST : admin/products/create
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProduct = await Product.countDocuments();
    req.body.position = countProduct + 1;
    // console.log(countProduct);
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const product = new Product(req.body);
  await product.save();
  // console.log(product);
  res.redirect(`${systemConfig.prefixAdmin}/products`);
};
