const bot = require("./facebook-page/index");

const api = new bot();
api.webhookListener((event) => {
  api.sendMessage("Test", event);
});
