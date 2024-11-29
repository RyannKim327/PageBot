const request = require("request");

module.exports = (senderID, message, pageAccessToken) => {
  console.log("Sending ...");
  request(
    {
      method: "POST",
      url: "https://graph.facebook.com/v13.0/me/messages",
      qs: {
        access_token: pageAccessToken,
      },
      json: {
        recipient: {
          id: senderID,
        },
        message: message,
      },
    },
    (error, response, body) => {
      if (error) console.error(`Error [Send Message]:${error}`);
      else if (response.body.error)
        console.error(`Error [Response]: ${response.body.error}`);
      else console.log(`Success [Send Message]: ${body}`);
    },
  );
};
