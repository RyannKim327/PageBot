const express = require("express");
const body = require("body-parser");
// import { } from "fs"
const handleMessage = require("./utils/handleMessage");
const handlePostback = require("./utils/handlePostback");

const app = express();
app.use(body.json());

const VERIFY_TOKEN = "pagebot";
const PAGE_ACCESS_TOKEN =
  // "EAAH40A5UDrYBO1LbsViUiZANJlU8DZAQye7f6OsLLZAtmQi61ivl1ZA8sthoc9ogad4I54sOZBPXEZBA8gIZCGZCa7h5eAf9GJtCwR0TVZAOr4i989uoos10Rc4ReajiObhLHGWN6eFi0XgeOrgQynZBhW25s7PXMa9184I7WQulCRr8BxVkOJAJnX7uZA9WCL7Ei12YFiVMaCn";
  "EAAH40A5UDrYBOzndZAs3UEw5hpl4l0vidoxkXwkER8YB4olPzyrSzJUVIKGbLDAyxG7IJke4gS3Bb8jsZClh0yMlXOjAZCl3Kghcbc8N6tfLP0PPLYfPDJS7yFDUNUVIwIusSeOMGB6zWZAlADPeCsFw30daL92DuhmcZBtiWvMwE6CW2lh8GSjZCfLIsr4mmWcKgJmPEx";
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (token && mode) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403);
    }
  }
});

app.post("/webhook", (req, res) => {
  const body = req.body;
  if (body.object === "page") {
    body.entry.forEach((event) => {
      if (event.message) {
        handleMessage(event, PAGE_ACCESS_TOKEN);
      } else {
        handlePostback(event, PAGE_ACCESS_TOKEN);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  }
});

app.listen(3000, () => {
  console.log("Listening");
});
