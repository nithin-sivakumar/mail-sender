# Mail Sender 📧

Send, Resend, and Verify OTPs with ease using `mail-sender`. This lightweight package simplifies email sending through any smtp server, making it perfect for use-cases like OTP verification in your applications.

## Installation

```bash
npm install @nithin-sivakumar/mail-sender
```

OR

```bash
npm i @nithin-sivakumar/mail-sender
```

## Usage

### Configuration

Before using mail-sender, you need to configure it with your Gmail credentials.

```javascript
const { config } = require("@nithin-sivakumar/mail-sender");

// Configure Gmail user and app password
config("your-email@gmail.com", "your-app-password");
```

### Send Mail

Use the sendMail function to send emails easily.

```javascript
const { sendMail } = require("@nithin-sivakumar/mail-sender");

// Send mail with default subject and content
sendMail("recipient@example.com");

// Send mail with custom subject and content
sendMail("recipient@example.com", "Custom Subject", "Custom HTML Content");
```

## API

```javascript
config(gmailId: string, googleAppPassword: string, smtpHost?: string, smtpPort?: number): Promise<void>
```

Configures Gmail user and app password for sending emails.

- gmailId: Gmail user email address.
- googleAppPassword: Gmail app password.
- smtpHost (optional, default: "smtp.gmail.com"): SMTP server host.
- smtpPort (optional, default: 465): SMTP server port.

```javascript
 sendMail(sendTo: string, subject?: string, content?: string): Promise<void>
```

Sends an email using the configured transporter.

- sendTo: Email recipient.
- subject (optional, default: "Sent using Mail Sender"): Email subject.
- content (optional, default: "Test Email"): Email content in HTML format.

## Examples

### Configuration

```javascript
const { config, sendMail } = require("@nithin-sivakumar/mail-sender");

async function configureAndSendMail() {
  await config("your-email@gmail.com", "your-app-password");

  // Send mail with default subject and content
  sendMail("recipient@example.com");

  // Send mail with custom subject and content
  sendMail("recipient@example.com", "Custom Subject", "Custom HTML Content");
}

configureAndSendMail();
```

## License

This package is open-source and available under the MIT License. See the LICENSE file for details.
