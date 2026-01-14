const axios = require("axios");
const { wrapper } = require("axios-cookiejar-support");
const { CookieJar } = require("tough-cookie");

module.exports = async (api, event, regex) => {
  const content = event.message.text.match(regex)[1].trim();

  const jar = new CookieJar();
  const client = wrapper(
    axios.create({
      jar,
      withCredentials: true,
    }),
  );

  await client.get(`${process.env.API_BACKEND}/set-cookie`);
  const { data } = await client.post(
    `${process.env.API_BACKEND}/feedback/submit`,
    {
      application: "Facebook Bot",
      message: content,
      userId: event.sender.id,
    },
  );
  if (data) {
    api.sendMessage(
      "Thank you for your feedback. If ever you encounter some error, please let us know",
      event,
    );
  }
};
