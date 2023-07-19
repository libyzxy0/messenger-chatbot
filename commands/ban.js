const db = require('../database/firebase');
module.exports.runFunction = async ({ api, event, config, userInfo }) => {
  let uid = Object.keys(event.mentions)[0];
  if(!uid) {
    return api.sendMessage('Please metion someone.', event.threadID, event.messageID)
  }
  let banned = await db.readData('bot/bannedUsers');
  if (config.admins.includes(event.senderID)) {
    if(banned.find(({ userID }) => userID === uid)) {
      return api.sendMessage('User already banned.', event.threadID, event.messageID)
    }
    db.writeData('bot/bannedUsers', {
      userID: uid
    }).then(res => api.sendMessage('User successfully banned.',event.threadID, event.messageID));
  } else {
    api.sendMessage(
      "You don't have a f*cking permission to use this command!",
      event.threadID,
      event.messageID
    );
  }
}