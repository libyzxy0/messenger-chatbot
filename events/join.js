const ameClient = require("amethyste-api");
const ameApi = new ameClient(
  "365745f69238ead2e433c23bb9ccd972293d3c9553a25fc31f647b4ae047e5b201bc5d94584dfe3afbd79d233ec8bbc85d2f1d610bf9749ddb97a0915e630040"
);
const fs = require("fs");
module.exports = async ({ api, event, config }) => {
  let userInfo = await api.getUserInfo(
    event.logMessageData.addedParticipants[0].userFbId
  );
  userInfo = userInfo[event.logMessageData.addedParticipants[0].userFbId];
  let gcInfo = await api.getThreadInfo(event.threadID);
  let url = 
  ameApi
    .generate("challenger", {
      url: url,
    })
    .then((image) => {
      const filePath = __dirname + "/../cache/join.png";
      fs.writeFile(filePath, image, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
        api.sendMessage(
          {
            attachment: fs.createReadStream(__dirname + "/../cache/join.png"),
          },
          event.threadID,
          event.messageID
        );
      });
    })
    .catch((err) => {
      throw err;
    });
  api.sendMessage(
    {
      body: `Welcome ${userInfo.name} to ${gcInfo.threadName}!`,
      attachment: fs.createReadStream(__dirname + "/cache/join.png"),
    },
    event.threadID
  );
};
