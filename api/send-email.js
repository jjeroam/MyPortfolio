// /api/send-email.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "fail", message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ status: "fail", message: "Missing required fields" });
  }

  try {
    await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: { name, email, message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.EMAILJS_PRIVATE_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ status: "success" });
  } catch (err) {
    console.error("EmailJS Error:", err.response?.data || err.message);
    res.status(500).json({ status: "fail", error: err.response?.data || err.message });
  }
}
