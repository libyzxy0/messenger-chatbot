const axios = require("axios");

module.exports.runFunction = async function({ api, event, args }) {
  let userInfo = await api.getUserInfo(event.senderID);
  userInfo = userInfo[event.senderID];
  let data = event.body.split(" ");
  if (data.length < 2) {
    api.sendMessage('Input undefined', event.threadID, event.messageID);
  } else {
    try {
      data.shift()
      axios.post('https://chat.libyzxy0.repl.co/api/v1/chat-api', {
        message: data.join(" "),
        userInfo,
        location: "Manila",
        apikey: process.env.OPEN_AI_KEY, 
        font: "enable"
      }).then((response) => {
        const message = response.data.message;

        api.sendMessage(message, event.threadID, event.messageID);
      }).catch((error) => {
        console.log(error)
        api.sendMessage(`${error}`, event.threadID, event.messageID);
      });
    } catch (err) {
      console.log(err);
      api.sendMessage(`${err}`, event.threadID, event.messageID);
    }
  }
};