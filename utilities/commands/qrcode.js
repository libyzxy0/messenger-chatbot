const fs = require("fs");
const http = require("https");
module.exports = ({ api, event, config }) => {
  let { prefix } = config;
  let data = event.body.split(" ");
  if (data.length < 2) {
    api.sendMessage(
      `⚠️Invalid Use Of Command!\n💡Usage: ${prefix}qrcode [txt]`,
      event.threadID,
      event.messageID
    );
  } else {
    try {
    data.shift()
    var url = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${data.join(" ")}`;
    var file = fs.createWriteStream(__dirname + "/cache/qrcode.png");
    http.get(url, function (rqs) {
      rqs.pipe(file);
      file.on("finish", function () {
        api.sendMessage(
          {
            attachment: fs.createReadStream(__dirname + "/cache/qrcode.png"),
          },
          event.threadID,
          event.messageID
        );
      });
    });
   } catch (err) {
     api.sendMessage(`Error: ${err}`, event.threadID, event.messageID)
   }
   } 
};
