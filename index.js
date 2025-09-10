/*
 * INFO:
 * Programmer: Ryann Kim Sesgundo [MPOP Reverse II]
 *
 * INFO: This file includes all the possible control in to the system.
 * It must handles the commands for command list and also the fallback
 * and other related functions and control.
 */

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
  title: "Answer Challenge 1",
  command: "flag_{([\\w\\W]+)}",
  hidden: true,
  unprefix: true,
  any: true,
});

api.addCommand("answer", {
  title: "Answer Challenges",
  command: "flag{([\\w\\W]+)}",
  hidden: true,
  unprefix: true,
  any: true,
});

api.addCommand("account", {
  title: "Alias",
  command: "alias ([\\w\\W]+)",
  hidden: true,
  unprefix: true,
});

api.setFallback("gpt", {
  title: "GPT 4o",
});

api.addAdmin("24611616828475926");

api.addPublicFolder("web/web-assets");

api.listen((app) => {
  app.get("/a-leaders-portrait", (req, res) => {
    res.setHeader("X-Powered-By", "MPOP Reverse II");
    res.sendFile(`${__dirname}/web/iforgotyourname.html`);
  });
  app.get("/sgtthfsdf", (req, res) => {
    res.setHeader("X-Powered-By", "MPOP Reverse II");
    res.download(`${__dirname}/assets/challenge4.jpg`);
  });
  app.get("/wrgw4regtwegvse", (req, res) => {
    res.setHeader("X-Powered-By", "MPOP Reverse II");
    res.download(`${__dirname}/assets/challenge5.wav`);
  });
  app.get("/sfhasdfefwe", (req, res) => {
    res.setHeader("X-Powered-By", "MPOP Reverse II");
    res.download(`${__dirname}/assets/challenge6.zip`);
  });
  app.get("/wgfwefweoo", (req, res) => {
    res.setHeader("X-Powered-By", "MPOP Reverse II");
    res.download(`${__dirname}/assets/challenge7.mp4`);
  });
  app.get("/dfgvevsdf", (req, res) => {
    res.setHeader("X-Powered-By", "MPOP Reverse II");
    res.status(204).end();
  });
  app.get("/challenge10", (req, res) => {
    res.setHeader(
      "token",
      "Bakit mo pa hahanapin kung pwede namang hindi di ba?",
    );
    res.setHeader(
      "X-Content-Cache",
      "aHR0cHM6Ly9wYXN0ZWJpbi5jb20vcTM0RHZnVUo=",
    );
    res.setHeader("X-Powered-By", "MPOP Reverse II");
    res.send(
      "<h3>If you cheat, then you can't solve this one. This was the most difficult challenge created in this entire series. Good Luck</h3>",
    );
  });
});
