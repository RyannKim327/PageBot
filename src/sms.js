const axios = require("axios");

module.exports = async (api, event, regex) => {
  const msg = event.message.text.match(regex);
  console.log(msg);
  console.log(regex);
  const { data } = await axios.get(
    `https://api.kenliejugarap.com/freesmslbc/?number=${msg[1]}&message=${msg[2]}`,
  );
  if (data.success) {
    api.sendMessage(
      `Message sent successfully:\nNumber: ${data.number}\nBody: ${data.message}`,
      event,
    );
  } else {
    api.sendMessage("Message not sent. Please try again later", event);
  }
};
