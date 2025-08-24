const axios = require("axios");

module.exports = async (api, event, regex) => {
  const body = event.message.text.match(regex);
  console.log(body[1]);
  api.sendMessage("Generated QR Code", event, (failed, response) => {});
  api.sendAttachment(
    "image",
    `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(body[1])}`,
    event,
    (failed, response) => {},
  );
};
