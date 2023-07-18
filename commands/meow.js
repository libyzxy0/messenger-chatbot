const http = require("https");
const fs = require("fs");
module.exports.runFunction = ({ api, event }) => {
  if (
    !!event.body.split(" ")[1] &&
    event.body.split(" ")[1].includes("-help")
  ) {
    const usage =
      "Name: Meow\n\n" +
      "Usage: ¢meow [no query]\n\n" +
      "Description: Sends random cat images.";
    return api.sendMessage(usage, event.threadID, event.messageID);
  }
  var url = `https://cataas.com/cat`;
  var file = fs.createWriteStream(__dirname + "/../cache/meow.png");
  http.get(url, function (rqs) {
    rqs.pipe(file);
    file.on("finish", function () {
      api.sendMessage(
        {
          attachment: fs.createReadStream(__dirname + "/cache/meow.png"),
        },
        event.threadID,
        event.messageID
      );
    });
  });
};
