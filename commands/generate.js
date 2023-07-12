const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const request = require("request");

module.exports.runFunction = async ({ api, event }) => {
  if (
      !!event.body.split(" ")[1] &&
      event.body.split(" ")[1].includes("-help")
    ) {
      const usage =
        "Name: Generate Image\n\n" +
        "Usage: ¢generate [txt]\n\n" +
        "Description: Sends any image that you want.";
      return api.sendMessage(usage, event.threadID, event.messageID);
  }
  const data = event.body.split(" ");
  if (data.length < 2) {
    api.sendMessage("Invalid use of command!", event.threadID, event.messageID);
  } else {
    try {
    data.shift();
    const configuration = new Configuration({
      apiKey: process.env.OPEN_AI_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: data.join(" "),
      n: 1,
      size: "1024x1024",
    });
    let url = response.data.data[0].url;

    await downloadImage(url); // Await the download function

    api.sendMessage(
      {
        attachment: fs.createReadStream(__dirname + "/../cache/generate.png"),
      },
      event.threadID,
      event.messageID
    );
   } catch (err) {
      api.sendMessage(`${err}`, event.threadID, event.messageID)
   }
  }
};

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    let file = fs.createWriteStream(__dirname + "/../cache/generate.png");
    let rqs = request(url);
    rqs.pipe(file);
    file.on("finish", () => {
      file.close();
      api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      resolve();
    });
    file.on("error", (err) => {
      reject(err);
    });
  });
}
