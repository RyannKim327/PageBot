const fs = require("fs");

module.exports = (api, event) => {
  const data = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"));
  data[event.sender.id] = [];
  fs.writeFileSync("data/gpt.json", JSON.stringify(data), "utf-8");
  api.sendMessage(
    {
      text: "The past queries are now cleared",
      reply_to: event.message.reply_to.mid,
    },
    event,
  );
};
