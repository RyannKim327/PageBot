const axios = require("axios");

module.exports = async (api, event, regex) => {
  const body = event.message.text.match(regex)[1];
  const { data } = await axios.get();
};
