module.exports = (api, event) => {
  api.sendMessage("Chill ka lang", event);
  api.sendAttachment(
    "image",
    `${__dirname}/../assets/chill.png`,
    event,
    (failed, response) => {
      console.log(failed);
      console.log(response);
    },
  );
};
