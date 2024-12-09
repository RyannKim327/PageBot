const fs = require("fs");

const d = fs.readFileSync("assets/chill.png");
// const data = d.toString("base64");
const ex = "assets/chill.png".split(".");
const t = ex[ex.length - 1];
console.log(t);
