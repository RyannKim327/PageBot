const request = require("request");

module.exports = async (senderID, message, pageAccessToken) => {
  console.log("Sending ...");
  await request(
    {
      url: "https://graph.facebook.com/v13.0/me/messages",
      qs: { access_token: pageAccessToken },
      method: "POST",
      json: {
        recipient: { id: senderID },
        message: message,
      },
    },
    (error, response, body) => {
      console.log("Tesst");
      if (error) {
        console.error("Error sending message:", error);
      } else if (response.body.error) {
        console.error("Error response:", response.body.error);
      } else {
        console.log("Message sent successfully:", body);
      }
    },
    console.log("Binatong data"),
  );
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
