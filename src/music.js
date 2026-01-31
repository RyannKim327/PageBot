const axios = require("axios");
const { get } = require("./../utils/api");

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

  console.log("Initiation");
  try {
    console.log("Calling");
    const search = await get(
      "https://api.ccprojectsapis-jonell.gleeze.com/api/ytsearch",
      {
        title: body,
      },
    );
    if (search.error) {
      throw new Error(search.error);
    }
    // TODO: To search easily

    let i = 0;
    if (search.videoId !== videoId || videoId === "") {
      if (data !== null && i < r.results.length) {
        videoId = search.results[i];
        i++;
      }
    }

    console.log("Done search");
    if (search) {
      console.log(search);
      const yt_link = `https://youtube.com/watch?v=${videoId}`;
      const music = await get(
        `https://api.ccprojectsapis-jonell.gleeze.com/api/audiomp3`,
        {
          url: yt_link,
        },
      );

      console.log(music);

      if (music.error) {
        throw new Error(
          "System error, please try again after 5 minutes, sorry.",
        );
      }

      api.sendMessage(
        `Here's your request entitled: ${music.title}`,
        event,
        () => {
          api.sendAttachment(
            "audio",
            music.downloadUrl,
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
  } catch (e) {
    api.sendMessage(`ERR [Music catch]: ${e.message}`, event);
  }
};
