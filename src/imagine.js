module.exports = (api, event, regex) => {
  const body = event.message.text.match(regex);
  api.sendMessage("Generating... ", event);
  api.sendAttachment(
    "image",
    `https://image.pollinations.ai/prompt/${encodeURI(body[1])}`,
    event,
    (failed, response) => {},
  );
};
