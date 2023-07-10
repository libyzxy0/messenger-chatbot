module.exports = ({ api, event }) => {
  let input = event.body;
  if (event.type == "message_reply") {
    if (
      !!event.body.split(" ")[1] &&
      event.body.split(" ")[1].includes("-help")
    ) {
      const usage =
        "Name: Unsent\n\n" +
        "Usage: ¢unsent [Reply to a message]\n\n" +
        "Description: Unsent a message.";
      return api.sendMessage(usage, event.threadID, event.messageID);
    }
    let data = input.split(" ");
    if (data.length < 5) {
      api.getUserInfo(event.senderID, (err, data) => {
        if (err) return console.error(err);
        else {
          api.getUserID(event.messageReply.messageID, (err, data) => {
            api.unsendMessage(event.messageReply.messageID);

            if (event.messageReply.senderID != api.getCurrentUserID())
              return api.sendMessage(
                "[ ERR ] Can't unsent message that aren't from the bot!",
                event.threadID,
                event.messageID
              );
          });
        }
      });
    }
  } else {
    api.sendMessage(
      "This feature is available on message_reply!",
      event.threadID,
      event.messageID
    );
  }
};
