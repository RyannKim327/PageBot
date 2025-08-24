const axios = require("axios");

module.exports = async (api, event, regex) => {
  const body = event.message.text.match(regex);
  api.sendMessage("Generated QR Code", event, (failed, response) => {
    if (!failed) {
      api.sendAttachment(
        "image",
        `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${body[1]}`,
        (failed, response) => {},
      );
    }
  });
};
