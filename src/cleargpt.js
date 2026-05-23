const fs = require("fs");

module.exports = (api, event) => {
  try {
    const gptPath = "data/gpt.json";
    const selfPath = "data/self.json";
    
    let data = {};
    if (fs.existsSync(gptPath)) {
      data = JSON.parse(fs.readFileSync(gptPath, "utf-8"));
    }

    let selfInfo = "an AI assistant";
    if (fs.existsSync(selfPath)) {
      selfInfo = fs.readFileSync(selfPath, "utf-8");
    }

    data[event.sender.id] = [
      {
        content: `Pretend to be someone with this information: ${selfInfo}`,
        role: "user",
      },
      {
        content: "Got it, thank you.",
        role: "assistant",
      },
    ];
    
    fs.writeFileSync(gptPath, JSON.stringify(data, null, 2), "utf-8");
    api.sendMessage("Your conversation history has been cleared.", event);
  } catch (error) {
    console.error("ClearGPT Error:", error);
    api.sendMessage("Failed to clear conversation history.", event);
  }
};
