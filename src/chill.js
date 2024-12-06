module.exports = (api, event) => {
  api.sendMessage("Chill ka lang", event);
  api.sendAttachment(
    "file",
    `${__dirname}/../assets/chill.png`,
    event,
    (failed, response) => {
      console.log(failed);
      console.log(JSON.stringify(response));
    },
  );
};
