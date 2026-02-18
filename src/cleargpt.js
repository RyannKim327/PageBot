const fs = require("fs");

module.exports = (api, event) => {
  const data = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"));
  data[event.sender.id] = [
    {
      content: `Pretend to be someone with this information ${fs.readFileSync("data/self.json", "utf-8")}`,
      role: "user",
    },
    {
      content: "Got it, thank you",
      role: "assistant",
    },
  ];
  fs.writeFileSync("data/gpt.json", JSON.stringify(data, null, 2), "utf-8");
  api.sendMessage("The past queries are now cleared", event);
};
