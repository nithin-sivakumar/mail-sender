// Import nodemailer library and SMTP server details from env.js
const nodemailer = require("nodemailer");
const { smtpHost, smtpPort } = require("./env");

// Declare global variables for Gmail user and app password, and transporter instance
let USER, APP_PASSWORD;
let transporter;

/**
 * Configures Gmail user and app password for sending emails.
 * @param {string} gmailId - Gmail user email address.
 * @param {string} googleAppPassword - Gmail app password.
 */
const config = async (gmailId, googleAppPassword) => {
  USER = gmailId;
  APP_PASSWORD = googleAppPassword;
  console.log(`Configuration successful!`);
  transporter = createTransporter(); // Create transporter instance on config
};

/**
 * Creates and configures a nodemailer transporter.
 * @returns {Object|null} - Nodemailer transporter instance or null if configuration is invalid.
 */
const createTransporter = () => {
  try {
    // Validate user and app password
    if (!USER || !APP_PASSWORD) {
      throw new Error(
        "USER and APP_PASSWORD must be configured using config()"
      );
    }

    // Create and configure nodemailer transporter
    return nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: true, // Use TLS
      auth: {
        user: USER,
        pass: APP_PASSWORD,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

/**
 * Sends an email using the configured transporter.
 * @param {string} [subject="Sent using NodeMailer"] - Email subject.
 * @param {string} [content="Test Email"] - Email content in HTML format.
 * @param {string} sendTo - Email recipient.
 */
const sendMail = async (
  subject = "Sent using NodeMailer",
  content = "Test Email",
  sendTo
) => {
  try {
    // If not already configured
    if (!USER || !APP_PASSWORD) {
      throw new Error(
        "USER and APP_PASSWORD must be configured using config()"
      );
    }

    // Verify the connection
    if (transporter) {
      transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(
            `Attempting to connect to server: ${smtpHost} at PORT: ${smtpPort}`
          );
          console.log(`Server is ready to send emails from: ${USER}`);
        }
      });
    }

    // Send mail
    transporter.sendMail(
      {
        from: USER,
        to: sendTo,
        subject: subject,
        html: content,
      },
      (err, info) => {
        console.log(info?.envelope);
        console.log(info?.messageId);
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

// Export sendMail and config functions
module.exports = {
  sendMail,
  config,
};

// // Sample usage:
// // OTP Generator
// const code = Math.floor(
//   Math.pow(10, 6 - 1) + Math.random() * 9 * Math.pow(10, 6 - 1)
// );
// // Options
// const options = {
//   subject: "Hypertension Login OTP",
//   content: `<p>Dear User, Your OTP to login to Hypertension app is: <b>${code}</b></p>`,
//   to: "psameerably03@gmail.com",
// };

// async function test() {
//   await config("nithinsgayathri@gmail.com", "cacppflpyfbefrhf"); // Set USER and APP_PASSWORD
//   sendMail(options.subject, options.content, options.to);
// }
// // Function call
// test();
