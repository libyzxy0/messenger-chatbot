module.exports = async ({ api, event }) => {
  const axios = require("axios");
  let input = event.body;
  let data = input.split(" ");
  if (
    !!event.body.split(" ")[1] &&
    event.body.split(" ")[1].includes("-help")
  ) {
    const usage =
      "Name: Simsimi\n\n" +
      "Usage: ¢sim [msg]\n\n" +
      "Description: Replies to your message that likes normal person.";
    return api.sendMessage(usage, event.threadID, event.messageID);
  }
  if (data.length < 2) {
    return api.sendMessage("What?", event.threadID, event.messageID);
  }
  data.shift();
  let response = await axios.get(
    `https://simsimi.fun/api/v2/?mode=talk&lang=ph&message=${data.join(
      " "
    )}&filter=false`
  );
  api.sendMessage(response.data.success, event.threadID, event.messageID);
};
