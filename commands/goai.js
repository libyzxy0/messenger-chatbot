const axios = require("axios");
const fs = require("fs");
const request = require("request");
module.exports.runFunction = async ({ api, event, userInfo }) => {
  if (
    !!event.body.split(" ")[1] &&
    event.body.split(" ")[1].includes("-help")
  ) {
    const usage =
      "Name: GoAI\n\n" +
      "Usage: ¢goai [msg]\n\n" +
      "Description: Chat GPT + Bard Combination.";
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
  const headers = {
  'Authorization': `Bearer ${process.env.OPEN_AI_KEY}`,
  'Content-Type': 'application/json'
};

const requestBody = {
  message: msg, 
  firstName: userInfo.firstName, 
  lastName: userInfo.name,
  setName: "Liby",
};
    let res = await axios.post('https://go-ai.libyzxy0.repl.co/', requestBody, { headers });
    let response = res.data.content;
    
const imageUrlPattern = /!\[.*?\]\((.*?)\)/;
const matches = response.match(imageUrlPattern);
if (matches && matches.length > 1) {
  const imageUrl = matches[1];
   console.log(imageUrl);
  let txt = response.split('!');
          let file = fs.createWriteStream(__dirname + "/../cache/goaiimage.png");
        let rqs = request(imageUrl);
        rqs.pipe(file);
        file.on("finish", () => {
          api.sendMessage(
            {
              body: txt[0], 
              attachment: fs.createReadStream(
                __dirname + "/../cache/goaiimage.png"
              ),
            },
            event.threadID,
            event.messageID
          );
          let desc = response.split('\n');
          setTimeout(() => {
            api.sendMessage(desc[4], event.threadID);
          }, 2000)
        });
} else {
  api.sendMessage(response, event.threadID, event.messageID)
}
  }
};