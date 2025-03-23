import { createTransport } from "nodemailer"; // Import nodemailer for sending emails

// Set up the transporter
const transporter = createTransport({
  service: "gmail", // or another email service provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password
  },
});

// Function to send email
const sendEmail = (to, subject, text, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to, // Recipient address
    subject, // Email subject
    text, // Plain text version of the email body
    html, // HTML version of the email body (optional)
  };

  return transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent: " + info.response);
    })
    .catch((error) => {
      console.error("Error sending email: " + error);
    });
};

export default { sendEmail };
