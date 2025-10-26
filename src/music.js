const axios = require("axios");

module.exports = async (api, event, regex) => {
  const body = event.message.text.match(regex);
  api.sendMessage(`Searching: ${body[1]}`, event);

  const search = await axios.get(
    // `https://kaiz-apis.gleeze.com/api/yt-metadata?title=${encodeURIComponent(body[1])}&apikey=${process.env.KAIZAPI}`,
    `https://api.ccprojectsapis-jonell.gleeze.com/api/ytsearch?title=${encodeURIComponent(body[1])}`,
  ).data.results[0];
  if (search) {
    const { data } = await axios.get(
      // `https://kaiz-apis.gleeze.com/api/ytdown-mp3?url=${encodeURIComponent("https://youtube.com/watch?v=" + search.data.videoId)}&apikey=${process.env.KAIZAPI}`,
      `https://api.ccprojectsapis-jonell.gleeze.com/api/audiomp3?url=${encodeURIComponent("https://youtube.com?watch?v=" + search.videoId)}`,
    );

    if (data.error) {
      return api.sendMessage(
        "System error, please try again after 5 minutes, sorry.",
        event,
      );
    }

    api.sendMessage(
      `Here's your request entitled: ${data.title}`,
      event,
      () => {
        api.sendAttachment(
          "audio",
          data.downloadUrl,
          event,
          (failed, response) => {
            console.log(`Music [RES]: ${failed} ${JSON.stringify(response)}`);
            console.log("Send");
          },
        );
      },
    );
  } else {
    api.sendMessage(
      "There's something wrong with this command, please wait until the developer fixed it, or try to search other song.",
      event,
    );
  }
};
