const fs = require("fs");
module.exports = async (api, event, regex) => {
  const codes = JSON.parse(fs.readFileSync("flags/sources.json", "utf-8"));
  const body = event.message.text
    .match(regex)[1]
    .toLowerCase()
    .replace(/\s/gi, "_");
  if (codes[body]) {
    const c = codes[body];
    const link = c.link.join("\n");
    const code = c.code;

    api.sendMessage(
      `You've got it, congratiolations.\n\nNow here's your ${c.current} challenge called: ${c.title}\n~ ${c.description}\nHints: ${c.hints.join("\n")}\n${link ? "Link: " + link : "Code: " + code}\nFlag Format: flag{${c.format ?? "thisisthefalagformat"}}\nNote: If you found your flag has spaces, please change those spaces to underscore. Thanks`,
      event,
    );
    // setTimeout(() => {
    //   api.sendToAdmin(
    //     `Facebook user: ${event.sender.id} solved: ${c.past}`,
    //     (failed, response) => {
    //       console.log(`Error: ${failed}`);
    //       console.log(`Response: ${response}`);
    //     },
    //   );
    // }, 1500);
  } else {
    api.sendMessage("Wrong flag, please try again", event);
  }
};
