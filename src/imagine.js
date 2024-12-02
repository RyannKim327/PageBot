module.exports = (api, event, regex) => {
  const body = event.message.text.match(regex);
  api.sendAttachment(
    "image",
    `https://image.pollinations.ai/prompt/${encodeURIComponent(body[1])}`,
    event,
    (failed, response) => {},
  );
};
