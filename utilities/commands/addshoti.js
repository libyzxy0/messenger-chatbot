const axios = require("axios");
module.exports = async ({ api, event, config }) => {
  if (config.admins.includes(event.senderID)) {
    let data = event.body.split(" ");
    if (data.length < 2) {
      api.sendMessage("Undefined url", event.threadID, event.messageID);
    } else {
      try {
        data.shift();
        for (let i = 0; i < data.length; i++) {
          let response = await axios.post(
            "https://shoti-api.libyzxy0.repl.co/api/add-shoti",
            { url: data[i], apikey: "jj" }
          );
          api.sendMessage(response.data.id, event.threadID, event.messageID);
        }
      } catch (err) {
        //console.log(err)
        api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
      }
    }
  } else {
    api.sendMessage(
      "You don't have a f*cking permission to use this command!",
      event.threadID,
      event.messageID
    );
  }
};
