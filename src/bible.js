import biblegateway from "biblegateway-scrape";

export default async (api, event, regex) => {
  try {
    const match = event.message.text.match(regex);
    if (!match || !match[1]) {
      return api.sendMessage("Please provide a bible verse. Usage: :verse <book> <chapter>:<verse>", event);
    }
    
    const query = match[1];
    const bible = await biblegateway.verse(
      query,
      biblegateway.version.ENG_NEW_LIVING_TRANSLATION,
    );

    if (!bible || !bible.book || !bible.verses) {
      return api.sendMessage(`Could not find verse: "${query}"`, event);
    }

    api.sendMessage(
      `${bible.book}\n\n${bible.verses.join("\n")}`,
      event,
    );
  } catch (error) {
    console.error("Bible Command Error:", error);
    api.sendMessage(`ERR [Bible]: ${error.message}`, event);
  }
};
