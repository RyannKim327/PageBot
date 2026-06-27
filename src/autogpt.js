import md from "./../utils/markdown.js";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (api, event) => {
  const data = JSON.parse(fs.readFileSync(`data/auto_user.json`, "utf-8"))
  if (data[event.sender.id] !== undefined) {
    data[event.sender.id] = undefined
    api.sendMessage("Auto AI False", event)
  } else {
    data[event.sender.id] = true
    api.sendMessage("Auto AI True", event)
  }
  fs.writeFileSync(`data/auto_user.json`, JSON.stringify(data, null, 2), 'utf-8')
};
