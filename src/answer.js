const fs = require("fs");
module.exports = async (api, event, regex) => {
  const codes = JSON.parse(fs.readFileSync("flags/sources.json", "utf-8"));
  const body = event.message.text
    .match(regex)[1]
    .toLowerCase()
    .replace(/\s/gi, "_");
  if (codes[body]) {
    const c = codes[body];
    const link = c.link.join("\n * ");
    const code = c.code;

    api.sendMessage(
      `You've got it, congratiolations, you completed the ${c.past} challenge\nNow here's your ${c.current} challenge called: ${c.title} [${c.difficulty ?? "Basic"}]\n~ ${c.description}\n\n${c.hints ? "Hints:\n * " + c.hints.join("\n * ") + "\n\n" : "No hint provided for this challenge.\n\n"}${link ? "Link:\n * " + link + "\n\n" : ""}${code ? "Code to decode: " + code + "\n\n" : ""}Flag Format: flag{${c.format ?? "thisisthefalagformat"}}\n\nNote: Some hints may not apply to decode, but to give you idea what the flag is. Also if you found your flag has spaces, please change those spaces to underscore. Thanks`,
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
