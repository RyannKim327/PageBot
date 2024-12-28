const UltimateGuitar = require("ultimate-guitar")

module.exports = async (api, event, regex) => {
  const guitar = new UltimateGuitar()
  const body = event.message.text.match(regex)
  await guitar.init(body[1])
  const result = await guitar.fetch_data(UltimateGuitar.RANDOM)

  const chords = await UltimateGuitar.get_chords(result.url)

  api.sendMessage(`Song Name: ${chords.song_name}\nArtist: ${chords.artist_name}\n\n${chords.chords}`, event)
}
