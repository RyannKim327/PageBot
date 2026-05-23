import fs from "fs";
import { post } from "../utils/api.js";

export default async (api, event, prefix) => {
  try {
    const senderID = event.sender.id;
    const gptPath = "data/gpt.json";
    const selfPath = "data/self.json";

    if (!fs.existsSync(gptPath)) {
      fs.writeFileSync(gptPath, "{}", "utf-8");
    }

    const msg = JSON.parse(fs.readFileSync(gptPath, "utf-8"));
    
    if (msg[senderID] === undefined) {
      let selfInfo = "an AI assistant";
      if (fs.existsSync(selfPath)) {
        selfInfo = fs.readFileSync(selfPath, "utf-8");
      }

      msg[senderID] = [
        {
          content: `Pretend to be someone with this information: ${selfInfo}`,
          role: "user",
        },
        {
          content: "Got it, thank you.",
          role: "assistant",
        },
      ];
    }

    const userMessage = event.message.text.substring(prefix.length).trim();
    if (!userMessage) return;

    msg[senderID].push({
      content: userMessage,
      role: "user",
    });

    const data = await post(`${process.env.API_BACKEND}/ai/chat`, {
      messages: msg[senderID],
    });

    if (data.error) {
      throw new Error(
        "My sincere apology, there's currently a problem within the system. Please try again later.",
      );
    }

    const reply = data.content;

    api.sendMessage(reply, event, (failed, response) => {
      if (!failed) {
        msg[senderID].push({
          role: "assistant",
          content: reply,
        });
        // Limit history to avoid huge files
        if (msg[senderID].length > 20) {
          msg[senderID] = [msg[senderID][0], msg[senderID][1], ...msg[senderID].slice(-18)];
        }
        fs.writeFileSync(gptPath, JSON.stringify(msg, null, 2), "utf-8");
      }
    });
  } catch (e) {
    console.error("GPT Command Error:", e);
    api.sendMessage(`ERR [GPT]: ${e.message}`, event);
  }
};
