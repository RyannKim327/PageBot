const UltimateGuitar = require("ultimate-guitar");

module.exports = async (api, event, regex) => {
  const body = event.message.text.match(regex);
  const data = await UltimateGuitar.searchSong(
    body[1],
    UltimateGuitar.category.CHORDS,
  );
  const response = data.responses[0];
  const result = await UltimateGuitar.fetchChords(data);

  const chords = result.response;

  api.sendMessage(
    `Song Name: ${response.song_name}\nArtist: ${response.artist_name}\n\n${chords}`,
    event,
  );
};
