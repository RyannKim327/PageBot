const md = require("./../utils/markdown");
module.exports = (api, event) => {
  api.sendMessage(md("Chill ka lang"), event);
  console.log(JSON.stringify(event, null, 2));
  api.sendToAdmin("Hello Admin", (error, response) => {
    if (error) console.error(error);
    console.log(response);
  });
  api.sendAttachment("image", `${__dirname}/../assets/chill.png`, event);
};
