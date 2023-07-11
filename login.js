const login = require("./fca-unofficial");
const fs = require("fs");
const color = require("colors");
const config = require('./config')
const font = require(config.fontPath);
const getAppstates = async () => {
  try {
    const files = await fs.promises.readdir("appstates");
    return files;
  } catch (error) {
    console.error("Error reading folder:", error);
    throw error;
  }
};

async function Listen(cb) {
    let appstates = await getAppstates();
    for (let i = 0; i < appstates.length; i++) {
      login(
        {
          appState: JSON.parse(
            fs.readFileSync(`./appstates/${appstates[i]}`, "utf8")
          ),
        },
        async (err, api) => {
          try {
          let cID = api.getCurrentUserID();
          let userInfo = await api.getUserInfo(cID);
          userInfo = userInfo[cID];
          console.log(
            `${color.blue(
              `Logged in as >>>`
            )} ${color.rainbow(`${userInfo.name}`)}`);
            console.log(`${color.green(`Appstate OK >>>`)} ${color.rainbow(`${appstates[i]}`)}`)

          if (err) return console.error("Login error");
          api.setOptions({
            logLevel: "silent",
            forceLogin: true,
            listenEvents: true,
            autoMarkDelivery: false,
            fontStyle: font, 
          });
          api.listen((err, event) => {
            if (err) return console.error(err);
            cb(api, event);
          });
            } catch (err) {
            if(!!err.errorSummary) {
              console.log(err.errorSummary)
            } else {
             // console.log(err)
            }
               console.log(color.red(`Appstate Error >>>`), color.blue(appstates[i]))
            }
        }
      );
    }
}

module.exports = { Listen };
