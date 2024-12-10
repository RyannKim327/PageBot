const biblegateway = require("biblegateway-scrape");

module.exports = async (api, event, regex) => {
  const data = event.message.text.match(regex)[1];
  const bible = await biblegateway.verse(
    data,
    biblegateway.version.ENG_NEW_LIVING_TRANSLATION,
  );
  console.log(bible);
  api.sendMessage(`${bible.book}\n\n${bible.verse}`, (failed, response) => {});
};
