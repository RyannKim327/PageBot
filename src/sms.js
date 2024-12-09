const axios = require("axios");

module.exports = async (api, event, regex) => {
  const msg = event.message.text.match(regex);
  const mg = `${msg[2]}`;
  const { data } = await axios.get(
    `https://api.kenliejugarap.com/freesmslbc/?number=${msg[1]}&message=${mg}`,
  );
  if (data.status) {
    api.sendMessage(
      `Message sent successfully:\nNumber: ${data.response}`,
      event,
    );
  } else {
    api.sendMessage("Message not sent. Please try again later", event);
  }
};
