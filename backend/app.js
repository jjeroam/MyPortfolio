require("dotenv").config({ path: "../.env" });
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body || {};

  try {
    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        name: name,
        email: email,
        message: message,
      },
    };

    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.EMAILJS_PRIVATE_KEY}`, // <-- NEW REQUIRED AUTH
          "Content-Type": "application/json",
          origin: "http://localhost",
        },
      }
    );

    res.json({ status: "success", data: response.data });
  } catch (err) {
    console.error("EmailJS Error:", err.response?.data || err.message);
    res.status(500).json({ status: "fail", error: err.response?.data });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
