const nodemailer = require("nodemailer");
const { smtpHost, smtpPort, USER, PASS } = require("../env");

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

module.exports = {
  transporter,
};
