const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission and send email
app.post("/send-email", (req, res) => {
  const senderName = req.body.senderName;
  const senderEmail = req.body.senderEmail;
  const subject = req.body.subject;
  const message = req.body.message;

  const transporter = nodemailer.createTransport({
    host: "your-smtp-host",
    port: "your-smtp-port",
    secure: true, // Use SSL/TLS
    auth: {
      user: "your-email@example.com",
      pass: "your-email-password",
    },
  });

  const mailOptions = {
    from: `${senderName} <${senderEmail}>`,
    to: "vishwa29naik@gmail.com", // Replace with your own email address
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred while sending the email:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.messageId);
      res.send("Email sent successfully");
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
