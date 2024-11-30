const axios = require("axios");

module.exports = async (api, event, regex) => {
  const msg = event.message.text.match(regex);
  console.log(msg);
  const { data } = await axios.get(
    `https://nethws3freesms-np.vercel.app/submit?message=${msg[2]}&number=${msg[1]}`,
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
