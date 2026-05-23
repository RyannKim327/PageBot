// const guitar = require("ultimate-guitar");
import * as guitar from "ultimate-guitar"

module.exports = async (api, event, regex) => {
  try {
    const body = event.message.text.match(regex);
    if (!body || !body[1]) {
      return api.sendMessage("Please provide a song name. Usage: :guitar <song name>", event);
    }

    const query = body[1].trim();
    const data = await guitar.searchSong(query);

    if (!data || !data.responses || data.responses.length === 0) {
      return api.sendMessage(`No results found for "${query}".`, event);
    }

    const response = data.responses[0];
    const result = await guitar.fetchChords(response);

    if (!result || !result.response) {
      return api.sendMessage(`Could not fetch chords for "${response.song_name}".`, event);
    }

    const chords = result.response;

    api.sendMessage(
      `Song Name: ${response.song_name}\nArtist: ${response.artist_name}\n\n${chords}`,
      event,
    );
  } catch (error) {
    console.error("Guitar Command Error:", error);
    api.sendMessage(`ERR [Guitar]: ${error.message}`, event);
  }
};
