const bot = require("./facebook-page/index");

const api = new bot();
api.webhookListener((event) => {
  console.log(`Event: ${JSON.stringify(event)}`);
  api.sendMessage(event.message.text, event);
});
