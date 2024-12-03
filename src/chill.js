module.exports = (api, event) => {
  api.sendMessage("Chill ka lang", event);
  api.sendAttachment(
    "image",
    `../assets/chill.png`,
    event,
    (failed, response) => {},
  );
};
