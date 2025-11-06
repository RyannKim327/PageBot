const axios = require("axios");
const fs = require("fs");

module.exports = async (api, event, prefix) => {
  const senderID = event.sender.id;
  // const AI = api.getAssistant();
  // if (!fs.existsSync(`${__dirname}/../data/gpt.json`)) {
  //   fs.createWriteStream(`${__dirname}/../data/gpt.json`);
  //   const msgs = [
  //     {
  //       role: "user",
  //       content: `Pretend to be the girlfriend of Ryann Kim Sesgundo named ${AI}. Ask my name first and don't answer the question if I didn't tell my name, before we start any communication`,
  //     },
  //     {
  //       role: "system",
  //       content: `Hello, my name is ${AI}, you may call me AI, may I ask your name?`,
  //     },
  //   ];
  //   const data = {};
  //   data[senderID] = msgs;
  //   fs.writeFileSync("data/gpt.json", JSON.stringify(data), "utf-8");
  // }
  //
  // const msg = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"));
  // if (!Object.keys(msg).includes(senderID)) {
  //   const msgs = [
  //     {
  //       role: "user",
  //       content: `Pretend to be the girlfriend of Ryann Kim Sesgundo named ${AI}. Ask my name first and don't answer the question if I didn't tell my name, before we start any communication`,
  //     },
  //     {
  //       role: "system",
  //       content: `Hello, my name is ${AI}, may I ask your name?`,
  //     },
  //   ];
  //   msg[senderID] = msgs;
  // }
  //
  // msg[senderID].push({
  //   role: "user",
  //   content: event.message.text.substring(prefix.length),
  // });

  const { data } = await axios.get(
    `https://pollinations-ai-sigma.vercel.app/?message=${encodeURIComponent(event.message.text.substring(prefix.length))}&user=${encodeURIComponent(event.sender.id)}`,
  );
  api.sendMessage(data.text ?? data.response, event, (failed, response) => {
    msg[senderID].push({
      role: "system",
      content: data.response,
    });
    fs.writeFileSync("data/gpt.json", JSON.stringify(msg), "utf-8");
  });
  if (data.image) {
    api.sendAttachment("image", data.image, event, (failed, response) => {});
  }
};
