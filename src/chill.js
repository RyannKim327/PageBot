const md = require("./../utils/markdown");
module.exports = (api, event) => {
  api.sendMessage(md("Chill ka lang"), event);
  api.sendAttachment(
    "image",
    `${__dirname}/../assets/chill.png`,
    event,
    (failed, response) => {
      console.log(failed);
      console.log(JSON.stringify(response));
    },
  );
};
