const bot = require("./facebook-page/index");
const gpt = require("./src/gpt");

const api = new bot();
api.webhookListener((event) => {
  const body = event.message.text;
  if (body.startsWith("/")) {
    event["message"]["text"] = body.substring(1);
    gpt(api, event);
  }
  // api.sendMessage(event.message.text, event);
});
