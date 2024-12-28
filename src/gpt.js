const axios = require("axios");

const fs = require("fs");

module.exports = async (api, event, prefix) => {
  const senderID = event.sender.id;
  if (!fs.existsSync(`${__dirname}/../data/gpt.json`)) {
    fs.createWriteStream(`${__dirname}/../data/gpt.json`);
    const msgs = [
      {
        role: "user",
        content:
          "Pretend to be the girlfriend of Ryann Kim Sesgundo named AI Haibara. Ask my name first and don't answer the question if I didn't tell my name, before we start any communication",
      },
      {
        role: "system",
        content: "Hello, my name is AI Haibara, you may call me AI, may I ask your name?",
      },
    ];
    const data = {};
    data[senderID] = msgs;
    fs.writeFileSync("data/gpt.json", JSON.stringify(data), "utf-8");
  }
  const msg = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"));
  if (!Object.keys(msg).includes(senderID)) {
    const msgs = [
      {
        role: "user",
        content:
          "Pretend to be the girlfriend of Ryann Kim Sesgundo named AI Haibara. Ask my name first and don't answer the question if I didn't tell my name, before we start any communication"
      },
      {
        role: "system",
        content: "Hello, my name is Nix, may I ask your name?",
      },
    ];
    msg[senderID] = msgs;
  }

  msg[senderID].push({
    role: "user",
    content: event.message.text.substring(prefix.length),
  });

  const { data } = await axios.post(
    "https://gpt24-ecru.vercel.app/api/openai/v1/chat/completions",
    {
      messages: msg[senderID],
      stream: false,
      model: "gpt-4o-mini",
      temperature: 0.5,
      presence_penalty: 0,
      frequency_penalty: 0,
      top_p: 1,
      max_tokens: 4000,
    },
  );
  console.log(data.choices[0]["message"]["content"]);
  api.sendMessage(
    data.choices[0]["message"]["content"],
    event,
    (failed, response) => {
      msg[senderID].push({
        role: "system",
        content: data.choices[0]["message"]["content"],
      });
      fs.writeFileSync("data/gpt.json", JSON.stringify(msg), "utf-8");
    },
  );
};
