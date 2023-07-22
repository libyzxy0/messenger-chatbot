module.exports = async ({ api, event, config }) => {
  let userInfo = await api.getUserInfo(event.logMessageData.leftParticipantFbId);
  userInfo = userInfo[event.logMessageData.leftParticipantFbId];
  let gcInfo = await api.getThreadInfo(event.threadID);
  if (event.author == event.logMessageData.leftParticipantFbId) {
    api.sendMessage(
      {
        body: `${userInfo.name} has left to ${gcInfo.threadName} byebyee!`,
      },
      event.threadID
    );
  } else {
    api.sendMessage(
      {
        body: `${userInfo.name} has kicked to ${gcInfo.threadName} byebyee!`,
      },
      event.threadID
    );
  }
};
