const { Listen } = require("./login");
const config = require("./config");
const font = require("./font-mj");
/*
function replaceCharacters(inputString) {
  if(inputString) {
  const replacedString = inputString.replace(/[A-Za-z]/g, (char) => {
    return font[char] || char;
  });
  return replacedString;
 }
}
*/
const { keep_alive } = require("./web");
Listen(async (api, event) => {
  /*
  api.sendMessageFont = function(data, threadID, messageID) {
    if(typeof (data) == "object") {   
      return api.sendMessage({
        body: replaceCharacters(data.body), 
        attachment: data.attachment
       }, threadID, messageID)
    } else {

    return api.sendMessage(replaceCharacters(data), threadID, messageID)
    }
  }
       */
  let userInfo = await api.getUserInfo(event.senderID);
  userInfo = userInfo[event.senderID];
  if (event.type == "message") {
    require("./handlers/message")({ api, event, config, userInfo });
  } else if (event.type == "message_reply") {
    require("./handlers/message_reply")({ api, event, config, userInfo });
  } else if (event.type == "event") {
    require("./handlers/event")({ api, event, config, userInfo });
  }
});
