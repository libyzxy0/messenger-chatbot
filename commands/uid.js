module.exports.runFunction = async ({ api, event }) => { 
  let userInfo = api.getUserInfo(event.senderID)
  userInfo = userInfo[event.senderID]
  if (Object.keys(event.mentions) == 0) {
     api.sendMessage({
       body: "Name: " + userInfo.name + "\nUid: " + event.senderID, 
       mentions: [{
         tag: userInfo.name,
         id: event.senderID,
         fromIndex: 0
     }]
     },
      event.threadID,
      event.messageID
    );
 } else {
    for (var i = 0; i < Object.keys(event.mentions).length; i++) {
      let info = await api.getUserInfo(Object.keys(event.mentions)[i]);
      info = info[Object.keys(event.mentions)[i]]
      api.sendMessage({
       body: "Name: " + info.name + "\nUid: " + Object.keys(event.mentions)[i]`, 
       mentions: [{
         tag: info.name,
         id: Object.keys(event.mentions)[i]`,
         fromIndex: 0
        }]
     },
      event.threadID,
      event.messageID
    );   
    }
  }
};
