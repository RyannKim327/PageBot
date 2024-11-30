const bot = require("./facebook-page/index");
const gpt = require("./src/gpt");

const api = new bot();
api.addCommand("gpt", {
  title: "GPT",
  command: "([\\w\\W]+)",
});

api.webhookListener((event) => {
  const body = event.message.text;
  // event["message"]["text"] = body.substring(1);
  gpt(api, event);
  // api.sendMessage(event.message.text, event);
});
