module.exports = async (api, event, regex) => {
  try {
    const match = event.message.text.match(regex);
    if (!match || !match[1]) {
      return api.sendMessage("Please provide text for the QR code. Usage: :qr <text>", event);
    }

    const text = match[1].trim();
    api.sendMessage("Generating QR Code...", event);
    api.sendAttachment(
      "image",
      `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`,
      event,
      (failed, response) => {
        if (failed) {
          console.error("QR Code Send Error:", failed);
        }
      },
    );
  } catch (error) {
    console.error("QR Command Error:", error);
    api.sendMessage(`ERR [QR]: ${error.message}`, event);
  }
};
