module.exports = async ({ api, event, config, userInfo, globalData }) => {
  let input = event.body;
  let cID = api.getCurrentUserID();
  let currentUserInfo = await api.getUserInfo(cID);
  currentUserInfo = currentUserInfo[cID];
  let aiPrefix = currentUserInfo.firstName.split(" ");
  const { name, prefix, banned } = config;
  //Prefix based commands
  if (input.startsWith(`${prefix}`)) {
    let cmd = input.substring(1);
    cmd = cmd.split(" ");
    if(banned.includes(event.senderID)) {
    return api.sendMessage("You're banned from using commands on this bot!", event.threadID, event.messageID)
    }
    try {
      if (cmd[0].length == 0) {
        return api.sendMessage(
          {
            body: "Yess " + userInfo.firstName + "?, that's my prefix.",
          },
          event.threadID,
          event.messageID
        );
      } else {
        let runIt = require(`../commands/${cmd[0]}`);
        runIt.runFunction({ api, event, config, userInfo, currentUserInfo, globalData });
      }
    } catch (err) {
      //If the file not foundor something error.
      if (err.code == "MODULE_NOT_FOUND") {
        api.sendMessage(
          `Command '${cmd[0]}' isn't found on command list.`,
          event.threadID,
          event.messageID
        );
      } else {
        console.log(err);
        api.sendMessage(`Error: ${err}`, event.threadID, event.messageID);
      }
    }
  }
  //Personalized AI based on user name!
  else if (input.startsWith(aiPrefix[0])) {
    let data = input.split(" ");
    if(data.length < 2) {
      api.sendMessage("What?", event.threadID, event.messageID);
    } else {
      try {
        data.shift()
        let ai = require("../aimodels/default");
        let res = await ai({ text: data.join(" "), userInfo, aiPrefix })
          api.sendMessage(res, event.threadID, event.messageID);
        
      } catch (err) {
        api.sendMessage(`Error: ${err}`, event.threadID, event.messageID)
      }
    }
  }
  //Code block of no prefix!
  else {
    try {
      let cmd = input.split(" ");
      let runIt = require(`../commands/noprefix/${cmd[0]}`);
      runIt({ api, event, config, userInfo });
    } catch (err) {
      //console.log(err)
      return;
    }
  }
};
