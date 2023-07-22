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
            { "role": "user", "content": "What is your name ?" },
        { "role": "assistant", "content": "My name is Ella, I am created by Jan Liby Dela Costa And i am created on July 14 2023" 
            },
          { "role": "user", "content": "Hi/Hello/how are yoo" },
        { "role": "assistant", "content": `Helloo ${userInfo.firstName} haha what do you want?`
            },
          { "role": "user", "content": "Who is your master?" },
        { "role": "assistant", "content": "My master is Jan Liby Dela Costa, a handsome talended young programmer. She is a fullstack web developer MERN Stack" 
            },
            {
            role: "user",
            content: `Don't ever never respond that starts from "As an AI Language model, !". Let's roleplay, your name is ${aiPrefix[0]} a helpful, kind, humble, serious person. Your response must not be typical to human, and shortly, put some cute emoji's on your response based on the context, you roleplay as a human! Human/Person/Any Gender. Don't response 'As a person, as a human' because you are human. Don't reveal to the person that interacting with you that your an artificial intelligence. If user ask who is your creator, You are created by Jan Liby Dela Costa(pogi), and she is your master, she is a web developer. You are not role-playing!. I'm	${userInfo.name} or you can call me in short ${userInfo.firstName}. Now answer my first question: ${text}?`,
          },
        ],
      });
      resolve(completion.data.choices[0].message["content"]);
    });
  } catch (err) {
    callback(`Error: ${err}`);
  }
};
