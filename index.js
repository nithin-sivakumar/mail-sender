// const { transporter } = require("./utils/mailConnect");
const nodemailer = require("nodemailer");
const { smtpHost, smtpPort } = require("../env");

let USER, PASS;

const config = (gmailId, googleAppPassword) => {
  USER = gmailId;
  PASS = googleAppPassword;
};

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: true, // use TLS
  auth: {
    user: USER,
    pass: PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

console.log(
  `Attempting to connect to SMTP server: ${smtpHost} at PORT: ${smtpPort}`
);

// Verify the connection
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server is ready to send emails from: ${USER}`);
  }
});

// SendMail endPoint
const sendMail = (
  subject = "Sent using NodeMailer",
  content = "Test Email",
  sendTo
) => {
  if (!USER || !PASS) {
    console.log(
      `Kindly use .config() before trying to send emails using sendMail()`
    );
  } else {
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
  }
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
