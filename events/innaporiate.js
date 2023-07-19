const db = require('../database/firebase');
module.exports = async ({ api, event, userInfo }) => {
  let banned = await db.readData('bot/bannedUsers');
  let data = event.body.split(" ");
  let badWords = [
  "tangina",
  "puke", 
  "dede", 
  "gago", 
  "puta", 
  "pota", 
  "potangina", 
  "pukingina",
  "tanginamo", 
  "pangit"
  ]
  data.shift(" ");
  let message = data.join(" ");
  message = message.toLowerCase();
  if(badWords.includes(message)) {
    if(!banned.find(({ userID }) => userID === event.senderID)) {
    db.writeData('bot/bannedUsers',{
      userID: event.senderID
    }).then(res => {
      
    })
   } 
  }
}