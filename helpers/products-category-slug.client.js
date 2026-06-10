const ProductCategory = require("../models/product-category.model");
// đệ quy lấy tất cả các category con

module.exports.getSubCategory = async (parentId) => {
  const getCategory = async (parentId) => {
    const subs = await ProductCategory.find({
      parent_id: parentId,
      // deleted: false,
    });
    let allSubs = [...subs];
    for (const sub of subs) {
      const childs = await getSubCategory(sub.id);
      allSubs = allSubs.concat(childs);
    }
    // console.log(allSubs);
    return allSubs;
  };
  const result = await getCategory(parentId);
  return result;
};
