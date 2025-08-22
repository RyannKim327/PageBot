const bot = require("./facebook-page/index");

const api = new bot();

api.setPrefix(":");

api.addCommand("chill", {
  title: "That chill guy",
  command: "chill",
});

api.addCommand("cleargpt", {
  title: "Clear GPT Queries",
  description:
    "This is just to clear all the past queries recored to the bot, or somewhat new AI conversation",
  command: "clear-gpt",
});

api.addCommand("guitar", {
  title: "Ultimate Guitar Tabs",
  description:
    "A command where you can have the guitar tabs from ultimate guitar website",
  command: "guitar ([\\w\\W]+)",
});

api.addCommand("imagine", {
  title: "Image Generator",
  description: "A image generator",
  command: "imagine ([\\w\\W]+)",
});

api.addCommand("music", {
  title: "Music Command",
  description: "A command that send music from youtube source.",
  command: "music ([\\w\\W]+)",
});

api.addCommand("sms", {
  title: "Free Text",
  description: "You may send your messages by just messaging it to us",
  command: "text ([\\d]+) ([\\w\\W]+)",
  maintenance: true,
});

api.addCommand("bible", {
  title: "Biblegateway verse",
  description: "You may now have the bible verses into your messenger.",
  command: "verse ([\\w\\W]+)",
});

api.addCommand("answer", {
  title: "Answer",
  command: "flag{([\\w\\W]+)}",
  hidden: true,
  unprefix: true,
});

api.setFallback("gpt", {
  title: "GPT 4-o",
});

api.listen();
