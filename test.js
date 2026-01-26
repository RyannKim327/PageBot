// const axios = require("axios");
//
// (async () => {
//   const { data } = await axios.post(
//     `https://graph.facebook.com/v23.0/me/feed`,
//     {
//       message: "hello",
//       access_token:
//         "EAAN9K3PXqocBPOiyZB4L16HzdijtUHFWdTGUSZAHYRhAovsHvUVuKcujr3799GSSEm8qo7ROiT9poS9MeX88kZCd0fDVrEgf33T6YZAGw3XKnORDXy9hLotgMk9StjuJIToxppzNN19qABiqancZCRsn96jY49HzGWImbNQpQVhGvwFMYZCZAUSte7RHAPXQT8DooV3kgZDZD",
//     },
//   );
//   console.log(data);
// })();
//

const UltimateGuitar = require("ultimate-guitar");

async function main() {
  const body = "Hello Adele";
  const data = await UltimateGuitar.searchSong(body);
  const result = await UltimateGuitar.fetchChords(data.responses[0]);

  const chords = result.response;
  console.log(JSON.stringify(chords));
}

main();
