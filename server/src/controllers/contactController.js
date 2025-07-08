import sendTelegramMessage from "../utils/sendTelegram.js";

const postContactMsg = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!name || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Name and message are required." });
    }

    await sendTelegramMessage({ name, email, message, rating });
    res.status(200).json({ success: true, message: "Telegram message sent!" });
  } catch (error) {
    console.error("Telegram error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send Telegram message" });
  }
};

export default postContactMsg;
