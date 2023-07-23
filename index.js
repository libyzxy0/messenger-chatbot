const { Listen } = require("./login");
const config = require("./config");
const { keep_alive } = require("./web");
const fs = require("fs");
const cron = require('node-cron');
const db = require('./database/firebase');
let msgs = {};
let globalData = {};
/*
db.writeData('bot/bannedUsers', {
  userID: "0",
  name: "Test User"
})
*/
Listen(async (api, event) => {
//Greetings

cron.schedule('0 7 * * *', () => { 
         api.getThreadList(100, null, ["INBOX"], (err, data) => { 
                 data.forEach(info => { 
                 if (info.isGroup && info.isSubscribed) { 
                 api.sendMessage("Good Morning Everyone! May this day be filled with sunshine, happiness, and lots of love. Have a wonderful day ahead!\n\n~Auto Greet~", info.threadID); 
                 } 
           })  
         }) 
 },{ 
         schedule: true,  
         timezone: "Asia/Manila"  
 }); 
  
 cron.schedule('0 12 * * *', () => { 
         api.getThreadList(100, null, ["INBOX"], (err, data) => { 
                 data.forEach(info => { 
                 if (info.isGroup && info.isSubscribed) { 
                 api.sendMessage("Good Afternoon Everyone! Hope you're having a lovely day so far.\n\n~Auto Greet~", info.threadID); 
                 } 
           })  
         }) 
 },{ 
         schedule: true,  
         timezone: "Asia/Manila"  
 }); 
  
 cron.schedule('0 19 * * *', () => { 
         api.getThreadList(100, null, ["INBOX"], (err, data) => { 
                 data.forEach(info => { 
                 if (info.isGroup && info.isSubscribed) { 
                 api.sendMessage("Good Evening Everyone! I hope you are enjoying a relaxing and peaceful end to your day. May your evening be filled with joy and happiness!\n\n~Auto Greet~", info.threadID); 
                 } 
           })  
         }) 
 },{ 
         schedule: true,  
         timezone: "Asia/Manila"  
 }); 
  
 cron.schedule('0 22 * * *', () => { 
         api.getThreadList(100, null, ["INBOX"], (err, data) => { 
                 data.forEach(info => { 
                 if (info.isGroup && info.isSubscribed) { 
                 api.sendMessage("Good Night Everyone! May your dreams be filled with peace, love, and happiness. Have a restful sleep and wake up feeling refreshed and ready for a new day.\n\n~Auto Greet~", info.threadID); 
                 } 
           })  
         }) 
 },{ 
         schedule: true,  
         timezone: "Asia/Manila"  
 });



  
  let userInfo = await api.getUserInfo(event.senderID);
  userInfo = userInfo[event.senderID];
  
  if (event.type == "message") {
    require("./events/innaporiate")({ api, event, config, userInfo, globalData });
    require("./handlers/message")({ api, event, config, userInfo, globalData });
    if (event.attachments.length != 0) {
      if (event.attachments[0].type == "photo") {
        msgs[event.messageID] = ["img", event.attachments[0].url];
      } else if (event.attachments[0].type == "animated_image") {
        msgs[event.messageID] = ["gif", event.attachments[0].url];
      } else if (event.attachments[0].type == "sticker") {
        msgs[event.messageID] = ["sticker", event.attachments[0].url];
      } else if (event.attachments[0].type == "video") {
        msgs[event.messageID] = ["vid", event.attachments[0].url];
      } else if (event.attachments[0].type == "audio") {
        msgs[event.messageID] = ["vm", event.attachments[0].url];
      }
    } else {
      msgs[event.messageID] = event.body;
    }
    //Write every new data
    fs.writeFile('./cache/msgs.json', JSON.stringify(msgs), err => {
     if (err) return console.log(err);
  }) 
  } else if (event.type == "message_reply") {
    require("./events/innaporiate")({ api, event, config, userInfo, globalData });
    require("./handlers/message_reply")({
      api,
      event,
      config,
      userInfo,
      globalData,
    });
  } else if (event.type == "event") {
    require("./handlers/event")({ api, event, config, userInfo });
  } else if (event.type == "message_unsend") {
    try {
      require("./handlers/message_unsend")({
        api,
        event,
        config,
        userInfo,
        msgs: require('./cache/msgs.json'),
      });
    } catch (err) {
      api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
      console.log(err);
    }
  }
});
