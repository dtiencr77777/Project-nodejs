const mongoose = require("mongoose");
const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    exiresAt: Date,
  },
  {
    timestamps: true,
  },
);

const ForgotPassword = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forgot-password",
);

module.exports = ForgotPassword;
