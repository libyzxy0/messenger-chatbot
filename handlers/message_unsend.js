const fs = require("fs");
const http = require("https");
module.exports = async ({ api, event, userInfo, msgs, config }) => {
  let { admins } = config;
  try {
    if(admins.includes(event.senderID)) {
      return console.log("An admin unsent a message.")
    }
    if(api.getCurrentUserID().includes(event.senderID)) {
      return console.log("An bot unsent a message.")
    }
    let unsentData = msgs[event.messageID];
    if(!unsentData) {
      return;//console.log("Unsent message error!")
    } else {
    if(typeof (unsentData) == "object") {
if (unsentData[0] == "img") {
	var file = fs.createWriteStream(__dirname + "/../cache/unsentphoto.jpg");
    http.get(unsentData[1], function (rqs) {
    	rqs.pipe(file);
        file.on('finish', function () {
        	var message = {
        	body: userInfo.name + ` unsent this photo`,
            attachment: fs.createReadStream(__dirname + '/../cache/unsentphoto.jpg'), 
            mentions: [{
            	tag: userInfo.name,
                id: event.senderID,
                fromIndex: 0
            }]
            }
    api.sendMessage(message, event.threadID);
  })
 })
}
else if (unsentData[0] == "gif") {
	var file = fs.createWriteStream(__dirname + "/../cache/unsentanimated_image.gif");
	http.get(unsentData[1], function (rqs) {
		rqs.pipe(file);
		file.on('finish', function () {
			var message = {
		    body: userInfo.name + ` unsent this GIF`,
            attachment: fs.createReadStream(__dirname + '/../cache/unsentanimated_image.gif'), 
            mentions: [{
            	tag: userInfo.name,
                id: event.senderID,
                fromIndex: 0
            }]
            } 
    api.sendMessage(message, event.threadID);
  })
 })
}
else if (unsentData[0] == "sticker") {
	var file = fs.createWriteStream(__dirname + "/../cache/unsentsticker.png");
	http.get(unsentData[1], function (rqs) {
		rqs.pipe(file);
        file.on('finish', function () {
        	var message = {
        	body: userInfo.name + ` unsent this Sticker`,
            attachment: fs.createReadStream(__dirname + '/../cache/unsentsticker.png'), 
            mentions: [{
            	tag: userInfo.name,
                id: event.senderID,
                fromIndex: 0
            }]
            }
        api.sendMessage(message, event.threadID);
   })
 })
}
else if (unsentData[0] == "vid") {
	var file = fs.createWriteStream(__dirname + "/../cache/unsentvideo.mp4");
	http.get(unsentData[1], function (rqs) {
		rqs.pipe(file);
		file.on('finish', function () {
			var message = {
		    body: userInfo.name + ` unsent this video\n`,
            attachment: fs.createReadStream(__dirname + '/../cache/unsentvideo.mp4'), 
            mentions: [{
            	tag: userInfo.name,
                id: event.senderID,
                fromIndex: 0
            }]
            }
        api.sendMessage(message, event.threadID);
  })
 })
}
else if (unsentData[0] == "vm") {
	var file = fs.createWriteStream(__dirname + "/../cache/unsentvoicemessage.mp3");
	http.get(unsentData[1], function (rqs) {
		rqs.pipe(file);
		file.on('finish', function () {
			var message = {
			body: userInfo.name + ` unsent this audio\n`,
            attachment: fs.createReadStream(__dirname + '/../cache/unsentvoicemessage.mp3'),
            mentions: [{
            	tag: userInfo.name,
                id: event.senderID,
                fromIndex: 0
            }]
            }
        api.sendMessage(message, event.threadID);
   })
 })
            }
    } else {
      api.sendMessage({
        	body: userInfo.name + ` unsent this message🍔:\n\n'${unsentData}'`,
            mentions: [{
            	tag: userInfo.name,
                id: event.senderID,
                fromIndex: 0
                }]
            }, event.threadID, event.messageID);
    }
     }
  } catch (err) {
                   api.sendMessage(`Error: ${err}`, event.threadID, event.messageID)
console.log(err)
  }     
}