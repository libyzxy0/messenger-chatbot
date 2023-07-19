const login = require("./fca-unofficial");
const fs = require("fs");
const color = require("colors");
const config = require("./config");
const getAppstates = async () => {
  try {
    const files = await fs.promises.readdir("appstates");
    return files;
  } catch (error) {
    console.error("Error reading folder:", error);
    throw error;
  }
};
const proxy = {
  protocol: 'https',
  host: '103.69.108.78',
  port: 8191,
  type: 'https',
  anonymityLevel: 'elite',
  country: 'PH',
  city: 'Ssantiago',
  hostname: '103.69.108.78 (CITI Cableworld Inc.)',
};
 
const local = {
  timezone: 'Asia/Manila',
  region: 'ph',
  headers: {
    'X-Facebook-Locale': 'en_US',
    'X-Facebook-Timezone': 'Asia/Manila',
    'X-Fb-Connection-Quality': 'EXCELLENT',
  },
};

async function Listen(cb) {
  let appstates = await getAppstates();
  for (let i = 0; i < appstates.length; i++) {
    login(
      {
        appState: JSON.parse(
          fs.readFileSync(`./appstates/${appstates[i]}`, "utf8")
        ),
        proxy: proxy, 
        local: local
      },
      async (err, api) => {
        try {
          let cID = api.getCurrentUserID();
          let userInfo = await api.getUserInfo(cID);
          userInfo = userInfo[cID];
          console.log(
            `${color.blue(`Logged in as >>>`)} ${color.rainbow(
              `${userInfo.name}`
            )}`
          );
          console.log(
            `${color.green(`Appstate OK >>>`)} ${color.rainbow(
              `${appstates[i]}`
            )}`
          );

          if (err) return console.error("Login error");
          api.setOptions({
            logLevel: "silent",
            forceLogin: true,
            listenEvents: true,
            autoMarkDelivery: false,
            font: { data: "test" }
          });
          api.listen((err, event) => {
            if (err) return console.error(err);
            cb(api, event);
          });
        } catch (err) {
          if (!!err.errorSummary) {
            console.log(err.errorSummary);
          } else {
            // console.log(err)
          }
          console.log(
            color.red(`Appstate Error >>>`),
            color.blue(appstates[i])
          );
        }
      }
    );
  }
}

module.exports = { Listen };
