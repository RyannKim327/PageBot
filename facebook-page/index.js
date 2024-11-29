const body = require("body-parser");
const express = require("express");
const request = require("request");

class FacebookPage {
  constructor() {
    this.FB_TOKEN = process.env.FB_TOKEN;
    this.KEY_TOKEN = process.env.KEY_TOKEN || "pagebot";
    this.app = express();
    this.app.use(body.json());
    this.__port = process.env.PORT || 3000;
  }

  webhookListener(actions) {
    if (typeof actions !== "function")
      return console.error(`Action type [ERROR]: Actions must be function.`);
    const app = this.app;
    app.get("/", (req, res) => {
      res.send("The main webpage was started.");
    });

    app.get("/webhook", (req, res) => {
      const mode = req.query["hub.mode"];
      const token = req.query["hub.verify_token"];
      const challenge = req.query["hub.challenge"];
      if (token && mode) {
        if (mode === "subscribe" && token === this.KEY_TOKEN) {
          res.status(200).send(challenge);
        } else {
          res.status(403);
        }
      }
    });

    app.post("/webhook", (req, res) => {
      const body = req.body;
      if (body.object === "page") {
        // console.log("PAGE");
        body.entry.forEach((entry) => {
          entry.messaging.forEach((event) => {
            // console.log(`CUSTOM: ${JSON.stringify(event)}`);
            if (event.message) {
              actions(event);
            } else {
              this.__postback(event);
            }
          });
        });
        res.status(200).send("EVENT_RECEIVED");
      }
    });
    this.app.listen(this.__port, () => {
      console.log("The service is now started");
    });
  }

  __postback(event) {
    const payload = event.postback.payload;

    this.sendMessage(
      `[INFO]: This is a message from a postback with payload: ${payload}`,
      event,
    );
  }

  sendMessage(message, event) {
    if (!this.FB_TOKEN) {
      return console.error(`TOKEN [ERR]: Undefined FB_TOKEN`);
    }
    if (typeof event !== "object") {
      return console.error(
        "ERROR [event type]: The event must be in Object or JSON type",
      );
    }
    console.log("Sending");
    console.log(`sending event ${JSON.stringify(event)}`);
    let msg = message;

    if (typeof message === "string") {
      msg = { text: message };
    }
    console.log(msg);
    request(
      {
        url: "https://graph.facebook.com/v13.0/me/messages",
        qs: { access_token: this.FB_TOKEN },
        method: "POST",
        json: {
          recipient: { id: event.sender.id },
          message: msg,
        },
      },
      (error, response, body) => {
        if (error) {
          console.error("Error sending message:", error);
        } else if (response.body.error) {
          console.error("Error response:", response.body.error);
        } else {
          console.log("Message sent successfully:", body);
        }
        console.log("hehe");
      },
    );
    console.log("Done (ata)");
  }
}

module.exports = FacebookPage;
