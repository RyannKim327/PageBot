const fs = require("fs");

module.exports = (api, event) => {
  const data = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"));
  data[event.sender.id] = [];
  fs.writeFileSync("data/gpt.json", JSON.stringify(data), "utf-8");
  api.sendMessage("The past queries are now cleared", event);
};
