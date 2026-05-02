const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const generate = require("../helpers/generate");

const accountschema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    password: String,
    token: {
      type: string,
      default: generate.generateRamdomString(25),
    },
    phone: Number,
    avatar: String,
    role_id: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  { timestamps: true },
);
const Account = mongoose.model("Account", accountschema, "accounts");

module.exports = Account;
