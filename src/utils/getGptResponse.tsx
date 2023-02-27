import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const configuration = new Configuration({
  organization: "org-wrCITx5RA3QWoEHSUGjp0Gt4",
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/**
 *
 * @description Get the response from the GPT-3 AI
 * @param prompt The prompt to send to the AI
 * @param setAIResponse A setter function to set the AI's response to the state
 * @param setPromptToSend A setter function to set the prompt to send to the state
 */
export async function getChatGPTResponse(
  prompt: string,
  setAIResponse: React.Dispatch<React.SetStateAction<string>>,
  setPromptToSend: React.Dispatch<React.SetStateAction<string>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  defaultPrompt: string
) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: defaultPrompt + `\n###\nInput: ${prompt}\nOutput: `, // add the prompt form the user
      max_tokens: 256,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\\n\\n###\\n\\n"],
    });
    console.log(
      "Prompt to chat gpt ---->",
      defaultPrompt + `\n###\nInput: ${prompt}\nOutput: `
    );
    const aiResponse = response.data.choices[0].text?.trim();
    setIsLoading(false); // stop the loading animation
    if (aiResponse) {
      setAIResponse(aiResponse); // if the AI's response is not null, set the AI's response to the state, otherwise keep the previous state
      setPromptToSend(prompt); // set the prompt to send to the state
    } else {
      setPromptToSend(prompt);
    }
  } catch (error) {
    setError("There was an error!");
    setIsLoading(false);
  }
}
