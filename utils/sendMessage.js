const request = require("request");
const axios = require("axios");
module.exports = async (senderID, message, pageAccessToken) => {
  console.log("Sending ...");
  await axios
    .post({
      url: "https://graph.facebook.com/v13.0/me/messages",
      qs: { access_token: pageAccessToken },
      body: {
        recipient: { id: senderID },
        message: message,
      },
    })
    .then((error, response) => {
      console.log("Tesst");
      if (error) {
        console.error("Error sending message:", error);
        // } else if (response.body) {
        //   console.error("Error response:", response.body.error);
      } else {
        console.log("Message sent successfully:", body);
      }
    })
    .catch((e) => {
      console.error(`Error [Catch]: ${e}`);
    });
  console.log("Binatong data");
};
