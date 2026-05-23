export default (api, event, regex) => {
  try {
    const match = event.message.text.match(regex);
    if (!match || !match[1]) {
      return api.sendMessage("Please provide a prompt. Usage: :imagine <prompt>", event);
    }

    const prompt = match[1].trim();
    api.sendMessage("Generating image... ", event);
    api.sendAttachment(
      "image",
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`,
      event,
      (failed, response) => {
        if (failed) {
          console.error("Imagine Send Error:", failed);
        }
      },
    );
  } catch (error) {
    console.error("Imagine Command Error:", error);
    api.sendMessage(`ERR [Imagine]: ${error.message}`, event);
  }
};
