const axios = require("axios");
const fs = require("fs");
const http = require("https");

module.exports = async (api, event, regex) => {
  const body = event.message.text.match(regex);
  api.sendMessage(`Searching: ${body[1]}`, event);
  const search = await axios.get(
    `https://apiv2.kenliejugarap.com/ytsearch?title=${body[1]}`,
  );
  if (search.data) {
    const { data } = await axios.get(
      `https://apiv2.kenliejugarap.com/music?url=${search.data.videos[0].url}`,
    );
    const file = fs.createWriteStream(
      `temp/${data.title.replace(/\W/gi, "_")}_${event.sender.id}.mp3`,
    );
    http.get(data.response, (res) => {
      res.pipe(file);
      file.on("finish", () => {
        api.sendMessage(
          `Here's your request entitled: ${data.title}`,
          event,
          () => {
            api.sendAttachment(
              "audio",
              `${__dirname}/../temp/${data.title.replace(/\W/gi, "_")}_${event.sender.id}.mp3`,
              event,
              (error, response) => {
                if (error) {
                  console.error(`Music [Err]: ${error}`);
                }
                console.log("Send");
                const f = `${__dirname}/../temp/${data.title.replace(/\W/gi, "_")}_${event.sender.id},mp3`;
                if (fs.existsSync(f)) {
                  fs.unlinkSync(f, (e) => { });
                }
              },
            );
          },
        );
      });
    });
  } else {
    api.sendMessage(
      "There's something wrong with this command, please wait until the developer fixed it, or try to search other song.",
    );
  }
};
