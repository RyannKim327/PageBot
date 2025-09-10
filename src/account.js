const { get, post } = require("../utils/gist");

module.exports = async (api, event, regex) => {
	const accounts = await get("accounts.json");
	const name = event.message.text.match(regex)[1];

	if (accounts[event.sender.id]) {
		return api.sendMessage("You're already registered", event);
	}

	accounts[event.sender.id] = name;
	await post("accounts.json", accounts);
	api.sendMessage(`You are registered as ${name}`, event);
};
