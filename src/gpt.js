const fs = require("fs");
const { get } = require("../utils/api");

module.exports = async (api, event, prefix) => {
  const senderID = event.sender.id;
  // const msg = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"));
  // if (msg[senderID] === undefined) {
  //   msg[senderID] = [];
  // }
  const data = await get(
    `https://pollinations-ai-sigma.vercel.app/?message=${encodeURIComponent(event.message.text.substring(prefix.length))}&user=${encodeURIComponent(event.sender.id)}`,
  );

  if (data.error) {
    api.sendMessage(
      "My sincere apology, there's currently a problem within the system. Sorry.",
      event,
    );
  }

  api.sendMessage(data.text ?? data.response, event, (failed, response) => {
    // msg[senderID].push({
    //   role: "system",
    //   content: data.response,
    // });
    // fs.writeFileSync("data/gpt.json", JSON.stringify(msg), "utf-8");
  });

  if (data.image) {
    api.sendAttachment("image", data.image, event, (failed, response) => {});
  }
};
