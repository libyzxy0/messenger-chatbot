module.exports = ({ api, event, config }) => {
  let { prefix } = config;
  let input = event.body;
  let data = input.split(" ");
  if (data.length < 2) {
    api.sendMessage(
      `⚠️Invalid Use Of Command!\n💡Usage: ${prefix}sendallgc [txt]`,
      event.threadID
    );
  } else {
    data.shift();
    try {
      let message = data.join(" ");
      api.getThreadList(100, null, ["INBOX"], (err, data) => {
        if (err) return console.error(err);
        data.forEach((info) => {
          if (info.isGroup && info.isSubscribed) {
            api.sendMessage(`${message}`, info.threadID);
          }
        });
      });
    } catch (err) {
      api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
  }
};
