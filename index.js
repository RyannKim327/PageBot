const bot = require("./facebook-page/index");
const gpt = require("./src/gpt");

const api = new bot();

api.addCommand("./src/cleargpt", {
  title: "Clear GPT Queries",
  command: "clear-gpt",
});

api.addCommand("./src/gpt", {
  title: "GPT",
  command: "([\\w\\W]+)",
});

api.webhookListener();
