const axios = require("axios");

module.exports = async (api, event) => {
  console.log(event);
  const msgs = [
    {
      role: "user",
      content: "Pretend to be my girlfriend named Nix",
    },
    {
      role: "system",
      content: "Hello my Love Kimmy. How are you?",
    },
    {
      role: "user",
      content: event.message.text,
    },
  ];
  const { data } = await axios.post(
    "https://gpt24-ecru.vercel.app/api/openai/v1/chat/completions",
    {
      messages: msgs,
      stream: true,
      model: "gpt-4o-mini",
      temperature: 0.5,
      presence_penalty: 0,
      frequency_penalty: 0,
      top_p: 1,
      max_tokens: 4000,
    },
  );
  api.sendMessage(data, event);
};
