// utils/email.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or use another SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, text, html = null) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html, // optional HTML
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email send failed:", error.message);
  }
};
