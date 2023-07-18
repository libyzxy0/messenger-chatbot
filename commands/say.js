const fs = require("fs");
const http = require("https");
module.exports.runFunction = ({ api, event }) => {
  let data = event.body.split(" ");
  if (data.length < 2) {
    api.sendMessage(
      `⚠️Invalid Use Of Command!\n💡Usage: ${prefix}say [txt]`,
      event.threadID,
      event.messageID
    );
  } else {
    data.shift();
    var url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${data.join(
      " "
    )}&tl=en&client=tw-ob`;
    var file = fs.createWriteStream(__dirname + "/../cache/say.mp3");
    http.get(url, function (rqs) {
      rqs.pipe(file);
      file.on("finish", function () {
        api.sendMessage(
          {
            attachment: fs.createReadStream(__dirname + "/../cache/say.mp3"),
          },
          event.threadID,
          event.messageID
        );
      });
    });
  }
};
