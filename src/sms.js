const axios = require("axios");

module.exports = async (api, event, regex) => {
  try {
    const match = event.message.text.match(regex);
    if (!match || !match[1] || !match[2]) {
      return api.sendMessage("Usage: :text <number> <message>", event);
    }

    const number = match[1];
    const message = match[2];

    const { data } = await axios.get(
      `https://api.kenliejugarap.com/freesmslbc/?number=${number}&message=${encodeURIComponent(message)}`,
    );

    if (data && data.status) {
      api.sendMessage(
        `Message sent successfully:\nNumber: ${data.response || number}`,
        event,
      );
    } else {
      api.sendMessage(`Message not sent: ${data?.message || "Please try again later"}`, event);
    }
  } catch (error) {
    console.error("SMS Command Error:", error);
    api.sendMessage(`ERR [SMS]: ${error.message}`, event);
  }
};
