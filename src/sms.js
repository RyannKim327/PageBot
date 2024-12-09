const axios = require("axios");

module.exports = async (api, event, regex) => {
  const msg = event.message.text.match(regex);
  const mg = `${msg[2]}\n\n---\nSent from a facebook page developed under MPOP Reverse II, API was developed by Kenlie Jugarap\n\n\n`;
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
