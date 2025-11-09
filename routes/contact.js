import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: process.env.EMAIL_TO,
        subject: `Portfolio Contact: ${name}`,
        html: `<p>${message}</p><p>From: <b>${name}</b> (${email})</p>`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("❌ Resend Error:", errorData);
      return res.status(500).json({ error: "Failed to send email", details: errorData });
    }

    console.log("✅ Email sent successfully via Resend!");
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ error: "Failed to send email", details: err.message });
  }
});

export default router;
