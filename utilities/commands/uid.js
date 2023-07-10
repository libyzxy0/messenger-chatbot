module.exports = ({ api, event }) => {
  if (Object.keys(event.mentions) == 0)
    return api.sendMessage(
      `${event.senderID}`,
      event.threadID,
      event.messageID
    );
  else {
    for (var i = 0; i < Object.keys(event.mentions).length; i++)
      api.sendMessage(`${Object.keys(event.mentions)[i]}`, event.threadID);
    return;
  }
};
