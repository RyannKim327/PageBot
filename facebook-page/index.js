const body = require("body-parser");
const fs = require("fs");
const express = require("express");
const request = require("request");

class FacebookPage {
  constructor() {
    this.FB_TOKEN = process.env.FB_TOKEN;
    this.KEY_TOKEN = process.env.KEY_TOKEN || "pagebot";
    this.app = express();
    this.app.use(body.json());
    this.__port = process.env.PORT || 3000;
    this.prefix = "/";
    this.commands = [];
    this.start = true;
    this.version = "v21.0";
    this.fallback = null
    this.types = {
      audio: "audio/mp3",
      image: "image/png",
      video: "video/mp4",
    };

    if (fs.existsSync(`${__dirname}/../temp/`)) {
      fs.rm(`${__dirname}/../temp/`, { recursive: true }, (e) => { });
    }
    setTimeout(() => {
      fs.mkdirSync(`${__dirname}/../temp`);
    }, 150);
  }

  // INFO: Public functions
  addCommand(script, command) {
    let file = `${process.cwd()}/src/${script}`;
    if (!script.endsWith(".js")) {
      file += ".js";
    }
    if (!fs.existsSync(file)) {
      this.start = false;
      return console.error(
        `Script [ERR]: The directory of the command is invalid or not found.`,
      );
    }
    if (!command) {
      this.start = false;
      return console.error(
        `Command [ERR]: The command must be exists or configured.`,
      );
    }
    if (!command.title || !command.command) {
      this.start = false;
      return console.error(
        `Commands [ERR]: Kindly check your command if there's a title and/or command`,
      );
    }
    command["script"] = script;
    this.commands.push(command);
  }

  setFallback(script, command) {
    if (typeof script !== 'string') {
      this.start = false
      return console.error("FALLBACK [ERR]: Script must be a string [File]")
    }
    if (!command) {
      this.start = false
      return console, error("FALLBACK [ERR]: Command must be exists")
    }
    if (typeof command !== 'object') {
      this.start = false
      return console.error(`FALLBACK [ERR]: The command must be an Object`)
    }
    if (!command.title) {
      this.start = false
      return console.error(`FALLBACK [ERR]: Title must be existed`)
    }
    this.fallback = command
    this.fallback['script'] = script
  }

  setPrefix(prefix) {
    this.prefix = prefix;
  }

  sendAttachment(type, file, event, callback) {
    if (!this.FB_TOKEN) {
      return console.error(`TOKEN [ERR]: Undefined FB_TOKEN`);
    }
    if (typeof event !== "object") {
      return console.error(
        "ERROR [event type]: The event must be in Object or JSON type",
      );
    }

    request(
      {
        url: `https://graph.facebook.com/${this.version}/me/messages`,
        qs: { access_token: this.FB_TOKEN },
        method: "POST",
        json: {
          recipient: { id: event.sender.id },
          message: {
            attachment: {
              type: type,
            },
          },
          filedata: `@/${file}`,
          type: this.types[type.toLowerCase()],
        },
      },
      (error, response, body) => {
        if (callback) {
          if (typeof callback === "function") {
            callback(error, response);
          }
        }
      },
    );
  }

  sendMessage(message, event, callback) {
    if (!this.FB_TOKEN) {
      return console.error(`TOKEN [ERR]: Undefined FB_TOKEN`);
    }
    if (typeof event !== "object") {
      return console.error(
        "ERROR [event type]: The event must be in Object or JSON type",
      );
    }

    let msg = message;

    if (typeof message === "string") {
      msg = { text: message };
    }
    request(
      {
        url: `https://graph.facebook.com/${this.version}/me/messages`,
        qs: { access_token: this.FB_TOKEN },
        method: "POST",
        json: {
          recipient: { id: event.sender.id },
          message: msg,
        },
      },
      (error, response, body) => {
        if (callback) {
          if (typeof callback === "function") {
            callback(error, response);
          }
        }
        // console.log("Sent");
      },
    );
  }

  // INFO: Private Functions
  #postback(event) {
    const payload = event.postback.payload;

    this.sendMessage(
      `[INFO]: This is a message from a postback with payload: ${payload}`,
      event,
    );
  }

  #regex(command) {
    if (typeof command !== "string") {
      if (command.command) {
        command = command.command;
      }
    }
    if (typeof command === "string") {
      let prefix = this.prefix;
      const prefixes = ["/", "\\", "$", "^"];
      if (prefixes.includes(prefix)) {
        prefix = `\\${prefix}`;
      }

      return new RegExp(`${prefix}${command}`, "i");
    }
  }

  #processhandler(event) {
    let done = false;
    const commands = this.commands;
    let c = 0;
    const execute = () => {
      let command = commands[c];
      const _regex = this.#regex(command.command);
      if (_regex.test(event.message.text) && !done) {
        const script = require(`./../src/${command.script}`);
        done = true;
        script(this, event, _regex);
      } else if (!done) {
        c++;
        execute();
      } else if (this.fallback !== null) {
        const script = require(`/../src/${this.fallback.script}`)
        script(this, event, this.prefix)
      }
    };
    execute();
  }

  // INFO: Webhook process
  webhookListener() {
    this.start = true && this.commands.length > 0;

    if (!this.start) {
      return console.error(
        `The're a problem with your configuration. Kindly check it first`,
      );
    }

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
        body.entry.forEach((entry) => {
          entry.messaging.forEach((event) => {
            if (event.message) {
              if (event.message.text.startsWith(this.prefix)) {
                this.#processhandler(event);
              }
            } else {
              this.#postback(event);
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
}

module.exports = FacebookPage;
