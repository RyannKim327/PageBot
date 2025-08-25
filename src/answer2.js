const fs = require("fs");
module.exports = async (api, event, regex) => {
  const codes = JSON.parse(fs.readFileSync("flags/sources.json", "utf-8"));
  const body = event.message.text.match(regex)[1].toLowerCase();
  if (codes[body]) {
    const c = codes[body];
    api.sendMessage(
      `You've got it, congratiolations.\n\n Your next challenge is: ${c.title}\n~ ${c.description}\nHints: ${c.hints.join("\n")}\nLink: ${c.link}\nFlag Format: flag{${c.flag ?? "thisisthefalagformat"}}`,
      event,
    );
  } else {
    api.sendMessage("Wrong flag, please try again", event);
  }
};
