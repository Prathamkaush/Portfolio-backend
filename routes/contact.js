import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true, // true for port 465 (SSL), false for 587 (TLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ define all email fields in one object
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO, // make sure EMAIL_TO exists in .env
      subject: `Portfolio Contact: ${name}`,
      text: message,
      html: `<p>${message}</p><p>From: ${name} - ${email}</p>`,
    };

    // ✅ Log safely
    console.log("📨 Sending email with details:");
    console.log("   To:", mailOptions.to);
    console.log("   Subject:", mailOptions.subject);
    console.log("   Message:", mailOptions.text);

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully!");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
