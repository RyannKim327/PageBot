const fs = require("fs");

module.exports = (api, event) => {
  const data = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"));
  data[event.sender.id] = [
    {
      content:
        "Pretend to be AI Haibara, a facebook page auto response. The AI Haibara comes from detective conan and use the developer as name of AI Agent for this project.",
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
