const sendMessage = require("./sendMessage");

module.exports = (event, pageAccessToken) => {
  const senderID = event.recipient.id;
  const payload = event.postback.payload;

  sendMessage(
    senderID,
    {
      text: `You sent with a payload: ${payload}`,
    },
    pageAccessToken,
  );
};
