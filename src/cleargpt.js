const fs = require("fs");

module.exports = (api, event) => {
  // const data = JSON.parse(fs.readFileSync("data/gpt.json", "utf-8"));
  // data[event.sender.id] = [
  //   {
  //     role: "user",
  //     content:
  //       "Pretend to be the girlfriend of Ryann Kim Sesgundo named Nix. Ask my name first before we start any communication",
  //   },
  //   {
  //     role: "system",
  //     content: "Hello, my name is Nix, may I ask your name?",
  //   },
  // ];
  // fs.writeFileSync("data/gpt.json", JSON.stringify(data), "utf-8");
  const { data } = await axios, get(`https://pollinations-ai-sigma.vercel.app/delete/?user=${encodeURIComponent(event.message.text.substring(prefix.length))}`)
  api.sendMessage("The past queries are now cleared", event);
};
