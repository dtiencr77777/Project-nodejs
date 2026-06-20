const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    // user_id: String,
    //  chưa đăng nhập thì cần => cart
    cart_id: String,
    userInfo: {
      fullName: String,
      phone: String,
      address: String,
    },
    products: [
      {
        product_id: String,
        price: Number,
        quantity: Number,
        discountPercentage: Number,
      },
    ],
    title: String,
    description: String,
    permissions: {
      type: Array,
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    // hiển thị thời gian
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
