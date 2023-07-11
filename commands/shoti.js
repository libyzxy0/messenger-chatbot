const fs = require("fs");
const axios = require("axios");
module.exports.runFunction = async ({ api, event }) => {
  let bannedGC = ["9492786270746965"];
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
        `https://shoti-api.libyzxy0.repl.co/api/get-shoti?apikey=shoti-UnlIfhfGoixLHO_TczGFEhPMFNNWos`
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
          throw new Error(`Error downloading video: ${error.message}`);
        }
      };
      downloadVideo(data.data.data.url, "utilities/commands/cache/shoti.mp4")
        .then(() => {
          api.setMessageReaction("✅", event.messageID, (err) => {}, true);
          api.sendMessage(
            {
              //body: `${data.message}`,
              attachment: fs.createReadStream(__dirname + "/cache/shoti.mp4"),
            },
            event.threadID,
            event.messageID
          );
        })
        .catch((error) => {
          api.sendMessage(error, event.threadID, event.messageID);
        });
    } catch (err) {
      console.log(err);
    }
  } else {
    api.sendMessage(
      "This command is not allowed on this gc.",
      event.threadID,
      event.messageID
    );
  }
};
