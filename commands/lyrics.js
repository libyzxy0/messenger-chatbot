const axios = require("axios");
const request = require("request");
const fs = require("fs");
module.exports.runFunction = async ({ api, event, config }) => {
  if (
    !!event.body.split(" ")[1] &&
    event.body.split(" ")[1].includes("-help")
  ) {
    const usage =
      "Name: Lyrics\n\n" +
      "Usage: ¢lyrics [Music Title]\n\n" +
      "Description: Sends any lyrics that you want.";
    return api.sendMessage(usage, event.threadID, event.messageID);
  }
  let { prefix } = config;
  let data = event.body.split(" ");
  if (data.length < 2) {
    api.sendMessage(
      `⚠️Invalid Use Of Command!\n💡Usage: ${prefix}lyrics [txt]`,
      event.threadID,
      event.messageID
    );
  } else {
    try {
      data.shift();
      let txt = data.join(" ");
      let response = await axios.get(
        `https://sampleapi-mraikero-01.vercel.app/get/lyrics?title=${txt}`
      );
      var file = fs.createWriteStream(__dirname + "/../cache/lrc_thumb.png");
      var rqs = request(encodeURI(`${response.data.result.s_image}`));
      rqs.pipe(file);
      file.on("finish", function () {
        api.sendMessage(
          {
            body: `${response.data.result.s_title} by ${response.data.result.s_artist}\n\n${response.data.result.s_lyrics}`,
            attachment: fs.createReadStream(__dirname + "/../cache/lrc_thumb.png"),
          },
          event.threadID,
          event.messageID
        );
      });
    } catch (err) {
      api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
    }
  }
};
