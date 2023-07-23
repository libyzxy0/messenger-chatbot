module.exports.runFunction = async ({ api, event, userInfo }) => { 
  if (Object.keys(event.mentions) == 0) {
     api.sendMessage(
      `Name: ${userInfo.name}\nUid: ${event.senderID}`,
      event.threadID,
      event.messageID
    );
 } else {
    for (var i = 0; i < Object.keys(event.mentions).length; i++) {
      let info = await api.getUserInfo(Object.keys(event.mentions)[i]);
      info = info[Object.keys(event.mentions)[i]]
       api.sendMessage(`Name: ${info.name}\nUid: ${Object.keys(event.mentions)[i]}`, event.threadID, event.messageID);
    }
  }
};