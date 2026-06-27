import fs from "fs"

export default async (api, event, regex) => {
  const data = JSON.parse(fs.readFileSync(`data/auto_user.json`, "utf-8"))
  if (data[event.sender.id]) {
    data[event.sender.id] = true
    api.sendMessage("Auto AI True")
  } else {
    data[event.sender.id] = undefined
    api.sendMessage("Auto AI False")
  }
  fs.writeFileSync(`data/auto_user.json`, JSON.stringify(data, null, 2), 'utf-8')
}
