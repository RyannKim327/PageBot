const fs = require("fs");
const { get, post } = require("../utils/api");

module.exports = async (api, event, prefix) => {
  try {
    const senderID = event.sender.id;
    const msg = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"));
    if (msg[senderID] === undefined) {
      msg[senderID] = [
        {
          content: `Pretend to be someone with this information ${fs.readFileSync("data/self.json", "utf-8")}`,
          role: "user",
        },
        {
          content: "Got it, thank you",
          role: "system",
        },
      ];
    }
    msg[senderID].push({
      content: event.message.text.substring(prefix.length),
      role: "user",
    });

    const data = await post(`${process.env.API_BACKEND}/ai/chat`, {
      messages: msg[senderID],
    });

    if (data.error) {
      throw new Error(
        "My sincere apology, there's currently a problem within the system. Sorry.",
      );
    }

    api.sendMessage(data.content, event, (failed, response) => {
      msg[senderID].push({
        role: "system",
        content: data.content,
      });
      fs.writeFileSync("data/gpt.json", JSON.stringify(msg, null, 2), "utf-8");
    });

    // if (data.image) {
    //  api.sendAttachment("image", data.image, event, (failed, response) => {});
    // }
  } catch (e) {
    api.sendMessage(e.message, event);
  }
};
