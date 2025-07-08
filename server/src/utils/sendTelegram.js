import axios from "axios";

const sendTelegramMessage = async ({ name, email, message, rating }) => {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_USER_ID;

  const text = `
📩 *New Contact Message Received* 
👤 *Name:* ${name}
📧 *Email:* ${email}
💬 *Message:* ${message}
⭐ *Rating:* ${rating}
`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  await axios.post(url, {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
  });
};

export default sendTelegramMessage;
