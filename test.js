import { guitar } from "ultimate-guitar";

async function main() {
  const body = "Hello Adele";
  const ug = guitar()
  const data = await ug.search(body);
  const result = await ug.fetch(data.responses[0]);

  const chords = result.response;
  console.log(JSON.stringify(chords));
}

main();
