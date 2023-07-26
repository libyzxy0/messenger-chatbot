const { bardAI, bardAsk } = require('../aimodels/bard.ai.js');
let cookie = JSON.parse(process.env.BARD_BISCUIT)
const bardAPI = new bardAI(cookie);

module.exports = { bardAsk, bardAPI };