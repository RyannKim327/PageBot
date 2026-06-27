import fs from "fs"
import DATAFILE from "./../utils/static"

export default async (api, event, regex) => {
  if (!fs.existsSync(`${__dirname}/../data/${DATAFILE}`)) {
    fs.writeFileSync(`data/${DATAFILE}`, "{}", "utf-8")
  }
  const data = JSON.parse(fs.readFileSync(`data/${DATAFILE}`, "utf-8"))
  if (data[event.sender.id]) {
    data[event.sender.id] = true
    api.sendMessage("Auto AI True")
  } else {
    data[event.sender.id] = undefined
    api.sendMessage("Auto AI False")
  }
  fs.writeFileSync(`data/${DATAFILE}`, JSON.stringify(data, null, 2), 'utf-8')
}
