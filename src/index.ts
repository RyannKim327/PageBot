import express from "express"
import { json } from "body-parser"
// import { } from "fs"
import handleMessage from './utils/handleMessage'
import handlePostback from './utils/handlePostback'

const app = express()
app.use(json())

const VERIFY_TOKEN = 'pagebot'
const PAGE_ACCESS_TOKEN = ""

app.get("/webhook", (req, res) => {
  const mode = req.query['hub.mode']
  const token = req.query['hub.verify_token']
  const challenge = req.query['hub.challenge']
  if (token && mode) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.status(200).send(challenge)
    } else {
      res.status(403)
    }
  }
})

app.post("/webhook", (req, res) => {
  const body = req.body
  if (body.object === 'page') {
    body.entry.forEach(event => {
      if (event.message) {
        handleMessage(event, PAGE_ACCESS_TOKEN)
      } else {
        handlePostback(event, PAGE_ACCESS_TOKEN)
      }
    });
    res.status(200).send('EVENT_RECEIVED')
  }
})

app.listen(3000, () => {
  console.log("Listening")
})
