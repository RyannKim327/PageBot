const bot = require("./facebook-page/index");
const gpt = require("./src/gpt");

const api = new bot();

api.addCommand("cleargpt", {
  title: "Clear GPT Queries",
  command: "clear-gpt",
});

api.addCommand("music", {
  title: "Music Command",
  command: "music ([\\w\\W]+)",
});

api.addCommand("sms", {
  title: "Free Text",
  command: "sms ([\\d]+): ([\\w\\W]+)",
});

api.setFallback("gpt", {
  title: "GPT",
});

api.webhookListener();
