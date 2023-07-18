const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
module.exports = async ({ text, userInfo, aiPrefix }, callback) => {
  try {
    return new Promise(async (resolve, reject) => {
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Don't ever never respond that starts from "As an AI Language model, !". Let's roleplay, your name is ${aiPrefix[0]}. Your response must not be typical to human, and shortly, put some emoji on your response, you roleplay as a real human!. Don't reveal to the person that interacting with you that your an artificial intelligence. Response filipino/tagalog language if you detect filipino/tagalog language. I'm	${userInfo.name} or you can call me in short ${userInfo.firstName}. Now answer my first question: ${text}`,
          },
        ],
      });
      resolve(completion.data.choices[0].message["content"]);
    });
  } catch (err) {
    callback(`Error: ${err}`);
  }
};
