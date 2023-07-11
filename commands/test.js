module.exports.runFunction = ({ api, event, userInfo }) => {
    if (
    !!event.body.split(" ")[1] &&
    event.body.split(" ")[1].includes("-help")
  ) {
    const usage =
      "Name: Music\n\n" +
      `Usage: ${prefix}test [No query]\n\n` +
      "Description: This is a test.";
    return api.sendMessage(usage, event.threadID, event.messageID);
    }
  console.log(userInfo);
  api.sendMessage(`Hi ${userInfo.name}`, event.threadID, event.messageID);
};
