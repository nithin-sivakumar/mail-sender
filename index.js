const { transporter } = require("./utils/mailConnect");

// Verify the connection
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is ready to send emails from: ${USER}`);
  }
});

const config = (gmailId, googleAppPassword) => {
  var USER = gmailId;
  var PASS = googleAppPassword;

  module.exports = {
    USER,
    PASS,
  };
};

// SendMail endPoint
const sendMail = (subject = "Sent using NodeMailer", content, sendTo) => {
  transporter.sendMail(
    {
      from: USER,
      to: sendTo,
      subject: subject,
      html: content,
    },
    (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
    }
  );
};

// Sample usage:
// OTP Generator
// const code = Math.floor(
//   Math.pow(10, 6 - 1) + Math.random() * 9 * Math.pow(10, 6 - 1)
// );
// // Options
// const options = {
//   subject: "Hypertension Login OTP",
//   content: `<p>Dear User, Your OTP to login to Hypertension app is: <b>${code}</b></p>`,
//   to: "psameerably03@gmail.com",
// };
// // Function call
// sendMail(options.subject, options.content, options.to);

module.exports = {
  sendMail,
  config,
};
