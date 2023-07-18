const axios = require("axios");
const fs = require("fs");
const request = require("request");
module.exports.runFunction = ({ api, event }) => {
  if (
    !!event.body.split(" ")[1] &&
    event.body.split(" ")[1].includes("-help")
  ) {
    const usage =
      "Name: TiktokDL\n\n" +
      "Usage: ¢tiktokdl [url]\n\n" +
      "Description: Tiktok downloader.";
    return api.sendMessage(usage, event.threadID, event.messageID);
  }
  let input = event.body;
  let data = input.split(" ");
  if (data.length < 2) {
    api.sendMessage(
      "Where's the fucking tiktok url?",
      event.threadID,
      event.messageID
    );
  } else {
    data.shift();
    let url = data.join(" ");
    api.sendMessage(
      "Downloading please wait.",
      event.messageID,
      event.threadID
    );
    axios
      .get(`https://tiktok-dl.libyzxy0.repl.co/?url=${url}`)
      .then((response) => {
        let file = fs.createWriteStream(__dirname + "/../cache/tiktokdl.mp4");
        let rqs = request(response.data.url);
        rqs.pipe(file);
        file.on("finish", () => {
          api.sendMessage(
            {
              attachment: fs.createReadStream(
                __dirname + "/../cache/tiktokdl.mp4"
              ),
            },
            event.threadID,
            event.messageID
          );
        });
      });
  }
};
