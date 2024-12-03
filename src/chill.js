module.exports = (api, event) => {
  api.sendAttachment(
    "image",
    `${__dirname}/../assets/chill.png`,
    event,
    (failed, response) => {},
  );
};
