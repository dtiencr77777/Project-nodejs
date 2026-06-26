const nodemailer = require("nodemailer");
module.exports.SendMail = (email, subject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dotienatt@gmail.com",
      pass: "mmzz tjil dbcc moag",
    },
  });

  const mailOptions = {
    from: "dotienatt@gmail.com",
    to: email,
    subject: subject,
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
