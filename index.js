const bot = require("./facebook-page/index");

const api = new bot();

api.addCommand("chill", {
  title: "That chill guy",
  command: "chill",
});

api.addCommand("cleargpt", {
  title: "Clear GPT Queries",
  command: "clear-gpt",
});

api.addCommand("imagine", {
  title: "Image Generator",
  command: "imagine ([\\w\\W]+)",
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

api.listen()
