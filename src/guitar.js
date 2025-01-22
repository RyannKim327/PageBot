const UltimateGuitar = require("ultimate-guitar");

module.exports = async (api, event, regex) => {
  const body = event.message.text.match(regex);
  let data = await UltimateGuitar.searchSong(body[1]);
  const result = await UltimateGuitar.fetchChords(data);

  const chords = result.responses;

  api.sendMessage(
    `Song Name: ${data.song_name}\nArtist: ${data.artist_name}\n\n${chords.chords}`,
    event,
  );
};
