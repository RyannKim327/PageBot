const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.setHeader("flag", "Ang mangga ay kulay green");
  res.send("<h3>Hello World</h3>");
});

app.post("/", (req, res) => {
  res.setHeader("flag-from-post", "SanaolSantol");
  res.send("hehe");
});

app.listen(3000, () => {
  console.log("Listening to 3k port");
});
