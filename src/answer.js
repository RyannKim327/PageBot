const fs = require("fs");
const { get, post } = require("../utils/gist");
module.exports = async (api, event, regex) => {
  const codes = JSON.parse(fs.readFileSync("flags/sources.json", "utf-8"));
  const body = event.message.text
    .match(regex)[1]
    .toLowerCase()
    .replace(/\s/gi, "_");
  const info = await get();
  if (!info.contestants[event.sender.id]) {
    info.contestants[event.sender.id] = 1;
  }
  if (codes[body]) {
    const c = codes[body];
    if (info.contestants[event.sender.id] !== c.x) {
      return api.sendMessage("Wrong flag, please try again", event);
    }
    const link = c.link ? c.link.join("\n * ") : "";
    const code = c.code ? c.code : "";
    const category = c.category ? `Category: ${c.category}\n` : "";
    let estimated_time = c.estimated ?? 7;

    api.sendMessage(
      `You've got it, congratiolations, you completed the ${c.past} challenge\nNow here's your ${c.current} challenge called: ${c.title} [${c.difficulty ?? "Basic"} level of difficulty]\nEstimated Time: ${estimated_time} days\n${category} ~ ${c.description}\n\n${c.hints ? "Hints:\n * " + c.hints.join("\n * ") + "\n\n" : "No hint provided for this challenge.\n\n"}${link ? "Link:\n * " + link + "\n\n" : ""}${code ? "Code to decode: " + code + "\n\n" : ""}Flag Format: flag{${c.format ?? "thisisthefalagformat"}}\n\nNote: Some hints may not apply to decode, but to give you idea what the flag is. Also if you found your flag has spaces, please change those spaces to underscore. Thanks`,
      event,
    );
    info.contestants[event.sender.id] += 1
    const x = await post(info);
    console.log("Done");
    console.log(x);
  } else {
    api.sendMessage("Wrong flag, please try again", event);
  }
};
