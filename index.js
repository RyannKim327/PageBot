const bot = require("./facebook-page/index");
const gpt = require("./src/gpt");

const api = new bot();

api.addCommand("cleargpt", {
  title: "Clear GPT Queries",
  command: "clear-gpt",
});

api.addCommand("sms", {
  title: "Free Text",
  command: "([0-9]+): (.*?)",
});

api.addCommand("gpt", {
  title: "GPT",
  command: "([\\w\\W]+)",
});

api.webhookListener();
