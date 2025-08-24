const axios = require("axios");

module.exports = async (api, event, regex) => {
  const body = event.message.text.match(regex)[1];
  // const { data } = await axios.get();
  if (body === "This_is_a_challenge_for_all_oudjsa") {
    api.sendMessage(
      "Congratiolations, you've got it. Now here's the challenge #2 link: https://drive.google.com/file/d/1dRwD_-qxKJOwI6xVSgqNgPmnyF6Puqfx/view?usp=sharing. Also please watch the video: https://www.facebook.com/TheKeyLang.newbie/videos/1324230165768246/ for full idea of this challenge.",
      event,
      (failed, response) => { },
    );
  } else {
    api.sendMessage("Sorry, wrong flag", event, (failed, response) => { });
  }
};
