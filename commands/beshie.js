module.exports.runFunction = ({ api, event }) => {
  const data = event.body.split(" ");
  if(data.length < 2) {
    api.sendMessage("Missing input!", event.threadID, event.messageID);
  } else {
    data.shift();
    let text = data.join(" ");
    text = text.replace(/\s/g, "🤸‍♂️")
    api.sendMessage(text, event.threadID, event.messageID)
  }
}