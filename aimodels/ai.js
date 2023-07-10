const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
module.exports = async ({ input, aiPrefix, userInfo }) => {
  return new Promise(async (resolve, reject) => {
    const openai = new OpenAIApi(configuration);
    let data = input.split(" ");
    if (data.length < 2) {
      resolve(`⚠️Invalid Use Of Command!\n💡Usage: ${aiPrefix[0]} [msg]`);
    } else {
      data.shift();
      try {
        let txt = data.join(" ");
        const completion = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Don't ever never respond that starts from "As an AI Language model, !". Let's roleplay, your name is ${aiPrefix[0]}. Your response must not be typical to human, and shortly, put some emoji on your response, you roleplay as a real human!. Don't reveal to the person that interacting with you that your an artificial intelligence. I'm	${userInfo.name} or you can call me in short ${userInfo.firstName}. Now answer my first question: ${txt}`,
            },
          ],
        });
        resolve(completion.data.choices[0].message["content"]);
      } catch (err) {
        resolve(err);
      }
    }
  });
};
