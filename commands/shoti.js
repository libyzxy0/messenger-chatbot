const fs = require("fs");
const axios = require("axios");
module.exports.runFunction = async ({ api, event, globalData }) => {
  let bannedGC = []; //["9492786270746965"];
  if (!bannedGC.includes(event.threadID)) {
    if (
      !!event.body.split(" ")[1] &&
      event.body.split(" ")[1].includes("-help")
    ) {
      const usage =
        "Name: Shoti\n\n" +
        "Usage: ¢shoti [no query]\n\n" +
        "Description: Sends random tiktok girl videos!";
      return api.sendMessage(usage, event.threadID, event.messageID);
    }
    try {
      let data = await axios.get(
        `https://shoti-api.libyzxy0.repl.co/api/get-shoti?apikey=shoti-1h67v3d1es4hju93kn`
      );
      const downloadVideo = async (url, destinationPath) => {
        try {
          const response = await axios({
            method: "GET",
            url: url,
            responseType: "stream",
          });

          const writer = fs.createWriteStream(destinationPath);
          response.data.pipe(writer);

          return new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
          });
        } catch (error) {
api.setMessageReaction("❌", event.messageID, (err) => {}, true);          api.sendMessage(`${err}`, event.threadID, event.messageID);
        }
      };
      downloadVideo(data.data.data.url, `${__dirname}/../cache/shoti.mp4`)
        .then(() => {
          api.setMessageReaction("✅", event.messageID, (err) => {}, true);
          api.sendMessage(
            {
              body: `@${data.data.user.username}`,
              attachment: fs.createReadStream(
                __dirname + "/../cache/shoti.mp4"
              ),
            },
            event.threadID,
            event.messageID
          );
        })
        .catch((error) => {
          api.sendMessage(error, event.threadID, event.messageID);
        });
    } catch (err) {
api.setMessageReaction("❌", event.messageID, (err) => {}, true);      api.sendMessage(`${err}`, event.threadID, event.messageID);
    }
  } else {
    api.sendMessage(
      "This command is not allowed on this gc.",
      event.threadID,
      event.messageID
    );
  }
};
