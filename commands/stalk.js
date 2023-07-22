const fs = require('fs');
const request = require('request');
module.exports.runFunction = async ({ api, event }) => {
  try {
          var uid = Object.keys(event.mentions)[0]; 
         if (Object.keys(event.mentions) == 0) return api. sendMessage(`Error, please tag someone!`, event.threadID, event.messageID); 
         else { 
         let data = await api.getUserInfo(parseInt(uid));
         var picture = `https://graph.facebook.com/${uid}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`; 
         var file = fs.createWriteStream(__dirname + "/../cache/stalk.png"); 
     var rqs = request(encodeURI(`${picture}`)); 
     rqs.pipe(file); 
     file.on('finish', function () {         
     var name = data[uid].name; 
     var username = data[uid].vanity; 
     var herGender = data[uid].gender; 
     var type = data[uid].type; 
     var url = data[uid].profileUrl; 
     var firstName = data[uid].firstName; 
     let gender = ""; 
     switch(herGender){ 
             case 1: 
            gender = "Female" 
            break 
         case 2: 
            gender = "Male" 
            break 
         default: 
            gender = "Custom" 
         } 
                 api.sendMessage({ 
                 body: `｢${firstName} Information｣\n\n\nName » ${name}\n\nUsername » ${username}\n\nGender » ${gender}\n\nType » ${type}\n\n${url}\n\nUid » ${uid}`,  
             attachment: fs.createReadStream(__dirname + '/../cache/stalk.png')}, event.threadID, event.messageID) 
      })  
  } 
 } catch (err) {
    api.sendMessage(`${err}`, event.threadID, event.messageID)
 }
}