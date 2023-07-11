const { Listen } = require("./login");
const config = require("./config");
const { keep_alive } = require("./web");
Listen(async (api, event) => {
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
