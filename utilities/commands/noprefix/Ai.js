const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
module.exports = async ({ api, event }) => {
  const openai = new OpenAIApi(configuration);
  let input = event.body;
  let data = input.split(" ");
  if (data.length < 2) {
    api.sendMessage(
      `⚠️Invalid Use Of Command!\n💡Usage: Ai [msg]`,
      event.threadID,
      event.messageID
    );
  } else {
    data.shift();
    let txt = data.join(" ");
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: txt }],
    });
    api.sendMessage(
      completion.data.choices[0].message["content"],
      event.threadID,
      event.messageID
    );
  }
};
