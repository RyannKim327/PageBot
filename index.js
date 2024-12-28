const bot = require("./facebook-page/index");

const api = new bot();

api.setPrefix(">")

api.addCommand("chill", {
  title: "That chill guy",
  command: "chill",
});

api.addCommand("cleargpt", {
  title: "Clear GPT Queries",
  command: "clear-gpt",
});

api.addCommand("guitar", {
  title: "Ultimate Guitar Tabs",
  command: "guitar ([\\w\\W]+)"
})

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
  command: "text ([\\d]+) ([\\w\\W]+)",
});

api.addCommand("bible", {
  title: "Biblegateway verse",
  command: "verse ([\\w\\W]+)",
});

api.setFallback("gpt", {
  title: "GPT",
});

api.listen();
