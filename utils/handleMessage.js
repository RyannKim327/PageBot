const sendMessage = require("./sendMessage");

module.exports = (event, pageAccessToken) => {
  const senderID = event.sender.id;
  const messageText = event.message.text;
  sendMessage(
    senderID,
    {
      text: `You sent with a payload: `,
    },
    pageAccessToken,
  );
};
