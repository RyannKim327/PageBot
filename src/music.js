const axios = require("axios");

module.exports = async (api, event, regex) => {
  let body = event.message.text.match(regex)[1];
  api.sendMessage(`Searching: ${body}`, event);

  let isLink = false;
  let videoId = "";

  if (body.includes("youtube.com")) {
    isLink = true;
    // TODO: URL Matching
    const regex = /youtube\.com\/watch\?v=([\w\W]+)/;
    if (regex.test(body)) {
      // TODO: Modification
      const modify = body.match(regex)[1];
      body = `https://youtube.com/watch?=${modify.split("&")[0]}`;
      videoId = modify.split("&")[0];
    }
  }
  if (body.includes("youtu.be")) {
    isLink = true;
    const regex = /youtu\.be\/([\w\W]+)/;
    if (regex.test(body)) {
      const modify = body.match(regex)[1];
      body = `https://youtube.com/watch?=${modify.split("?")[0]}`;
      videoId = modify.split("?")[0];
    }
  }
try{
  const search = await axios
    .get(
      // `https://kaiz-apis.gleeze.com/api/yt-metadata?title=${encodeURIComponent(body[1])}&apikey=${process.env.KAIZAPI}`,
      `https://api.ccprojectsapis-jonell.gleeze.com/api/ytsearch?title=${encodeURIComponent(body)}`,
    )
    .then((r) => {
      if(r.data.error){
        return api.sendMessage(`ERR [Music]: ${data.error}`, event);
      }
      let i = 0;
      data = r.data.results[i];
      while (
        data.videoId !== videoId &&
        i < r.data.results.length &&
        isLink
      ) {
        console.log("Link Test Activation");
        data = r.data.results[i];
        i++;
      }
      return data
    })
    .catch((e) => {
      return null;
    });

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
}catch(e){
  api.sendMessage(
    `ERR [Music catch]: ${e.message}`,
    event,
  );
}
};
