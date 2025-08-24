module.exports = async (api, event, regex) => {
  const code = "aselfencryptioncreatedforallnewbieslikeme";
  const body = event.message.text.match(regex)[1].toLowerCase();
  if (code === body) {
    api.sendMessage("You've got it, congratiolations", event);
  } else {
    api.sendMessage("Wrong flag, please try again", event);
  }
};
