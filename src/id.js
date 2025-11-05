module.exports = async (api, event, regex) => {
  api.sendMessage(`Your page ID is ${event.sender.id}`, event);
  api.sendToAdmin(`The ID was ${event.sender.id}`);
};
