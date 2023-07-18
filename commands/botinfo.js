module.exports.runFunction = ({ api, event, config, currentUserInfo }) => {
  api.sendMessage(
    `｢Info｣\n\nName: ${currentUserInfo.name}\nCreator: ${config.creator}\nDescription: A messenger chatbot for educational and entertainment purposes.`,
    event.threadID,
    event.messageID
  );
};
