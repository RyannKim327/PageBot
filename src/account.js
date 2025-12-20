const { get, post } = require("../utils/gist");

module.exports = async (api, event, regex) => {
  api.sendMessage("This feature is freezed", event);
  return;
  const accounts = await get("accounts.json");
  const name = event.message.text.match(regex)[1].trim().replace(/\s/gi, "_");
  const names = JSON.stringify(accounts).toLowerCase();

  if (names.includes(name.toLowerCase())) {
    return api.sendMessage("This name is already taken.", event);
  }

  if (accounts[event.sender.id]) {
    return api.sendMessage("You're already registered", event);
  }

  accounts[event.sender.id] = name;
  await post("accounts.json", accounts);
  api.sendMessage(`You are registered as ${name}`, event);
  api.sendToAdmin(`Account registerd: ${event.sender.id} as ${name}`);
};
