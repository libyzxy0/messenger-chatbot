const axios = require("axios");
const fs = require("fs");
const request = require("request");
const { bardAsk } = require('../handlers/bardhandler.js');
module.exports.runFunction = async ({ api, event }) => {
  if (
    !!event.body.split(" ")[1] &&
    event.body.split(" ")[1].includes("-help")
  ) {
    const usage =
      "Name: Bard AI\n\n" +
      "Usage: ¢bard [msg]\n\n" +
      "Description: Bard AI from google.";
    return api.sendMessage(usage, event.threadID, event.messageID);
  }
  let input = event.body;
  let data = input.split(" ");
  if (data.length < 2) {
    api.sendMessage(
      "Yes",
      event.threadID,
      event.messageID
    );
  } else {
    data.shift();
    let msg = data.join(" ");
    let response = await bardAsk(msg);
const imageUrlPattern = /!\[.*?\]\((.*?)\)/;
const matches = response.match(imageUrlPattern);
if (matches && matches.length > 1) {
  const imageUrl = matches[1];
  let txt = response.split('!');
          let file = fs.createWriteStream(__dirname + "/../cache/bard_image.png");
        let rqs = request(imageUrl);
        rqs.pipe(file);
        file.on("finish", () => {
          api.sendMessage(
            {
              body: txt[0], 
              attachment: fs.createReadStream(
                __dirname + "/../cache/bard_image.png"
              ),
            },
            event.threadID,
            event.messageID
          );
        });
} else {
  api.sendMessage(response, event.threadID, event.messageID)
}
  }
};