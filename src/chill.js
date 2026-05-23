import md from "./../utils/markdown.js";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (api, event) => {
  api.sendMessage(md("Chill ka lang"), event);
  console.log(JSON.stringify(event, null, 2));
  api.sendToAdmin("Hello Admin", (error, response) => {
    if (error) console.error(error);
    console.log(response);
  });
  api.sendAttachment("image", `${__dirname}/../assets/chill.png`, event);
};
