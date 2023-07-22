const db = require('../database/firebase');
module.exports = async ({ api, event, userInfo }) => {
  const badwords = [
    "tangina", 
    "putangina", 
    "gago", 
    "puta", 
    "amputa", 
    "dede", 
    "puke", 
    "tite", 
    "nipples", 
    "nudes", 
    "pangit", 
    "tamod", 
    "banmesenpai", 
    "cock", 
    "penis", 
    "cum", 
    "chupa", 
    "boobs", 
    "pussy"
  ]
  let banned = await db.readData('bot/bannedUsers');
  let data = event.body.split(" ");
  data.shift(" ");
  let message = data.join(" ");
  message = message.toLowerCase();
  if(badwords.includes(message)) {
    if(!banned.find(({ userID }) => userID === event.senderID)) {
    db.writeData('bot/bannedUsers',{
      userID: event.senderID
    }).then(res => {
      
    })
   } 
  }
}