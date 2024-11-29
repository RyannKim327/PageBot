const request = require("request");

module.exports = async (senderID, message, pageAccessToken) => {
  console.log("Sending ...");
  axios
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
      } else if (response.body) {
        console.error("Error response:", response.body.error);
      } else {
        console.log("Message sent successfully:", body);
      }
    })
    .catch((e) => {
      console.error(`Error [Catch]: ${e}`);
    });
  console.log("Binatong data");
  // );
  // request(
  //   {
  //     method: "POST",
  //     url: "https://graph.facebook.com/v13.0/me/messages",
  //     qs: {
  //       access_token: pageAccessToken,
  //     },
  //     json: {
  //       recipient: {
  //         id: senderID,
  //       },
  //       message: message,
  //     },
  //   },
  //   (error, response, body) => {
  //     if (error) console.error(`Error [Send Message]:${error}`);
  //     else if (response.body.error)
  //       console.error(`Error [Response]: ${response.body.error}`);
  //     else console.log(`Success [Send Message]: ${body}`);
  //   },
  // );
};
