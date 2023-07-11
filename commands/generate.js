const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const request = require("request");
module.exports.runFunction = async ({ api, event }) => {
  const data = event.body.split(" ");
  if (data.length < 2) {
    api.sendMessage("Invalid use of command!", event.threadID, event.messageID);
  } else {
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
    let url = response;
    console.log(url);
    let file = fs.createWriteStream("utilities/commands/cache/generate.png");
    let rqs = request(response.data.url);
    rqs.pipe(file);
    file.on("finish", () => {
      api.sendMessage(
        {
          attachment: fs.createReadStream(__dirname + "/cache/generate.png"),
        },
        event.threadID,
        event.messageID
      );
    });
  }
};
