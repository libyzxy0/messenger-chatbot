module.exports.runFunction = async ({ api, event, config
}) => {
	let { admins } = config;
	let list = [];
	for (let i = 0; i < admins.length; i++) {
    let info = await api.getUserInfo(admins[i]);
    info = info[admins[i]]
		list.push(`• ${info.name}\n\n`);
    }
    api.sendMessage(`｢Admins｣${list.join("")}`, event.threadID, event.messageID);
\n\n