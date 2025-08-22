const axios = require("axios");

module.exports = async (api, event, regex) => {
  const body = event.message.text.match(regex)[1];
  // const { data } = await axios.get();
  if (body === "This_is_a_challenge_for_all_oudjsa") {
    api.sendMessage(
      "Congratiolations, you've got it.",
      event,
      (failed, response) => {},
    );
  } else {
    api.sendMessage("Sorry, wrong flag", event, (failed, response) => {});
  }
};
