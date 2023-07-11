const os = require("os");
module.export.runFunction = ({ api, event }) => {
  let cpu = os.loadavg()
    let ut = os.uptime()
    let sec = ut
    let min = sec / 60
    let hr = min / 60
    sec = Math.floor(sec)
    min = Math.floor(min)
    hr = Math.floor(hr)
    sec = sec%60
    min = min%60
    hr = hr%60
    api.sendMessage({
    	body: `｢System Info｣\n\n• Machine » ${os.machine()}\n• OS » ${os.type()}\n• Arch » ${os.arch()}\n• Version » ${os.version()}\n• Platform » ${os.platform()}\n• Uptime » ${hr} hours, ${min} minutes, and ${sec} seconds\n• RAM » ${Math.round(os.totalmem() / 1000000000 * 10) / 10}GB/4GB\n\n｢CPU｣\n\n• CPU-0 » ${Math.trunc(cpu[0])}%\n• CPU-1 » ${Math.trunc(cpu[1])}%\n• CPU-2 » ${Math.trunc(cpu[2])}%`
    }, event.threadID, event.messageID);
}