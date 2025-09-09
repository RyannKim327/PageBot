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
    const due = new Date(`${c.due} 23:59`);
    const now = new Date();
    const passList = Array.isArray(c.pass) ? c.pass : [];
    const time = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    // TODO: Flag invalidity
    if (info.contestants[event.sender.id] !== c.x) {
      return api.sendMessage("Wrong flag, please try again", event);
    }

    // TODO: Time expirations
    if (now.getTime() >= due.getTime() && !passList.includes(event.sender.id)) {
      api.sendToAdmin(`${event.sender.id}: Past the due date ${time}`);
      return api.sendMessage(
        "You're past the due date of the challenge. Please contact the developer for this, or send us your reasons why you didn't do the challenge on time.",
        event,
      );
    }

    const link = c.link ? c.link.join("\n * ") : "";
    const code = c.code ? c.code : "";
    const category = c.category ? `Category: ${c.category}\n` : "";
    let estimated_time = c.estimated ?? 7;

    api.sendMessage(
      `You've got it, congratiolations, you completed the ${c.past} challenge\nNow here's your ${c.current} challenge called: ${c.title} [${c.difficulty ?? "Basic"} level of difficulty]\nEstimated Time: ${estimated_time} days\n${category} ~ ${c.description}\n\n${c.hints ? "Hints:\n * " + c.hints.join("\n * ") + "\n\n" : "No hint provided for this challenge.\n\n"}${link ? "Link:\n * " + link + "\n\n" : ""}${code ? "Code to decode: " + code + "\n\n" : ""}Flag Format: flag{${c.format ?? "thisisthefalagformat"}}\n\nNote: Some hints may not apply to decode, but to give you idea what the flag is. Also if you found your flag has spaces, please change those spaces to underscore. Thanks`,
      event,
    );
    info.contestants[event.sender.id] += 1;

    api.sendToAdmin(
      `The account owner ${event.sender.id} is now solving the ${c.current} challenge`,
    );

    const x = await post(info);
  } else {
    api.sendMessage("Wrong flag, please try again", event);
  }
};
