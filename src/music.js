import { get } from "./../utils/api.js";

export default async (api, event, regex) => {
  try {
    const match = event.message.text.match(regex);
    if (!match || !match[1]) {
      return api.sendMessage("Please provide a song name or YouTube link. Usage: :music <query>", event);
    }

    let body = match[1];
    api.sendMessage(`Searching: ${body}`, event);

    if (body.includes("youtube.com")) {
      const ytRegex = /youtube\.com\/watch\?v=([^&]+)/;
      if (ytRegex.test(body)) {
        const videoId = body.match(ytRegex)[1];
        body = `https://youtube.com/watch?v=${videoId}`;
      }
    } else if (body.includes("youtu.be")) {
      const ytBeRegex = /youtu\.be\/([^?]+)/;
      if (ytBeRegex.test(body)) {
        const videoId = body.match(ytBeRegex)[1];
        body = `https://youtube.com/watch?v=${videoId}`;
      }
    }

    console.log("Initiation: Music search");
    const search = await get(`${process.env.API_BACKEND}/yt`, {
      videoID: body,
    });

    if (search.error) {
      try {
        throw new Error(JSON.stringify(search.error, null, 2));
      } catch (e) {
        throw new Error(search.error)
      }
    }

    if (!search.url) {
      throw new Error("Could not find a download URL for this request.");
    }

    api.sendMessage(
      `Here's your request entitled: ${search.title || "Unknown Title"}`,
      event,
      () => {
        api.sendAttachment("audio", search.url, event, (failed, response) => {
          if (failed) {
            console.error(`Music [RES ERR]: ${failed}`);
          } else {
            console.log("Music sent successfully");
          }
        });
      },
    );
  } catch (e) {
    console.error("Music Command Error:", e);
    try {
      api.sendMessage(`ERR [Music]: ${JSON.stringify(e.message, null, 2)}`, event);
    } catch (e) {
      api.sendMessage(`ERR [Music]: ${e.message}`, event)
    }
  };
}
