const login = require("./fca-unofficial");
const fs = require("fs");
const color = require("colors");
const cron = require('node-cron');
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
/*
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
*/

async function Listen(cb) {
  let appstates = await getAppstates();
  for (let i = 0; i < appstates.length; i++) {
    let credentials = JSON.parse(fs.readFileSync(`./appstates/${appstates[i]}`, "utf8"));
    //Validate appstate
    if(typeof credentials != "object" && !credentials[0]) {
      return console.error('Invalid appstate: ' + appstates[i])
    }
    login(
      {
        appState: credentials,
        //proxy: proxy, 
        //local: local
      },
      async (err, api) => {
cron.schedule('0 7 * * *', () => { 
         api.getThreadList(100, null, ["INBOX"], (err, data) => { 
                 data.forEach(info => { 
                 if (info.isGroup && info.isSubscribed) { 
                 api.sendMessage("Good Morning Everyone! May this day be filled with sunshine, happiness, and lots of love. Have a wonderful day ahead!\n\n~Auto Greet~", info.threadID); 
                 } 
           })  
         }) 
 },{ 
         schedule: true,  
         timezone: "Asia/Manila"  
 }); 
  
 cron.schedule('0 12 * * *', () => { 
         api.getThreadList(100, null, ["INBOX"], (err, data) => { 
                 data.forEach(info => { 
                 if (info.isGroup && info.isSubscribed) { 
                 api.sendMessage("Good Afternoon Everyone! Hope you're having a lovely day so far.\n\n~Auto Greet~", info.threadID); 
                 } 
           })  
         }) 
 },{ 
         schedule: true,  
         timezone: "Asia/Manila"  
 }); 
  
 cron.schedule('0 19 * * *', () => { 
         api.getThreadList(100, null, ["INBOX"], (err, data) => { 
                 data.forEach(info => { 
                 if (info.isGroup && info.isSubscribed) { 
                 api.sendMessage("Good Evening Everyone! I hope you are enjoying a relaxing and peaceful end to your day. May your evening be filled with joy and happiness!\n\n~Auto Greet~", info.threadID); 
                 } 
           })  
         }) 
 },{ 
         schedule: true,  
         timezone: "Asia/Manila"  
 }); 
  
 cron.schedule('0 22 * * *', () => { 
         api.getThreadList(100, null, ["INBOX"], (err, data) => { 
                 data.forEach(info => { 
                 if (info.isGroup && info.isSubscribed) { 
                 api.sendMessage("Good Night Everyone! May your dreams be filled with peace, love, and happiness. Have a restful sleep and wake up feeling refreshed and ready for a new day.\n\n~Auto Greet~", info.threadID); 
                 } 
           })  
         }) 
 },{ 
         schedule: true,  
         timezone: "Asia/Manila"  
 });
        
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
