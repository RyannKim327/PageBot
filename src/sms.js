const axios = require("axios");

module.exports = async (api, event, regex) => {
  const msg = event.message.text.match(regex);
  const { data } = await axios.get(
    `https://nethws3freesms-np.vercel.app/submit?message=${msg[2]}&number=${msg[1]}`,
  );
  if (data.success) {
    api.sendMessage(
      "Message sent successfully, you may now unsent your messaage",
      event,
    );
  } else {
    api.sendMessage("Message not sent. Please try again later", event);
  }
};
