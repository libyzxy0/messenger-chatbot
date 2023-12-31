const { Listen } = require("./login");
const config = require("./config");
const { keep_alive } = require("./web");
const fs = require("fs");
const db = require('./database/firebase');
let { bardAPI } = require('./handlers/bardhandler');
let msgs = {};
let globalData = {};
/*
db.writeData('bot/bannedUsers', {
  userID: "0",
  name: "Test User"
})
*/
bardAPI.login();
Listen(async (api, event) => {

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
        msgs,
      });
    } catch (err) {
      api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
      console.log(err);
    }
  }
});
