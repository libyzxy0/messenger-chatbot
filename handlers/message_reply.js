module.exports = ({ api, event, config, userInfo }) => {
  let input = event.body;
  const { name, prefix } = config;
  if (input.startsWith(`${prefix}`)) {
    let cmd = input.substring(1);
    cmd = cmd.split(" ");
    try {
      let runIt = require(`../utilities/commands/${cmd[0]}`);
      runIt({ api, event, config, userInfo });
    } catch (err) {
      //If the file not foundor something error.
      if (err.code == "MODULE_NOT_FOUND") {
        console.log(err);
        api.sendMessage(
          "That fucking command is not defined on my command list!",
          event.threadID,
          event.messageID
        );
      } else {
        console.log(err);
        api.sendMessage(
          "Something went wrong!",
          event.threadID,
          event.messageID
        );
      }
    }
  }
};
