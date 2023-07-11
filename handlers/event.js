module.exports = ({ api, event, config, userInfo }) => {
  if (event.logMessageType == "log:subscribe") {
    require("../events/join.js")({ api, event, config });
  } else if (event.logMessageType == "log:unsubscribe") {
    require("../events/left.js")({ api, event, config });
  } else {
  }
};
