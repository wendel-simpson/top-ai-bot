import { Configuration, OpenAIApi } from "openai";

const OPENAI_API_KEY = "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";

const DEFAULT_PROMPT =
  "Ask questions based on input and guide users to write better answers. If input is an incomplete sentence, output should be blank.\n\nInput: Poor customer service\nOutput: Please provide more details about your experience with customer service?\nInput: The agent was rude and unhelpful\nOutput: Could you tell us more about what happened specifically?\nInput: The agent shouted at me and cut the call without giving me any resolution\nOutput: What did you need help with that the agent did not provide you with a resolution for?\nInput: I wanted to know how to deposit a check\nOutput: Thank you for the feedback!\n\nInput: Good interaction.\nOutput: Could you tell us more about what made the interaction positive?\nInput: Agent was helpful and resolved my issue in record time!\nOutput: What issue were you having and what did the agent do to help you?\nInput: I was having an issue with my mobile app. I was not able to login. The agent helped me to login by resetting my password\nOutput: Thank you for the feedback!\n\nInput: The interaction was not interesting.\nOutput: Could you tell us more about why the interaction was not interesting?\nInput: The wait time was huge!\nOutput: How long did you have to wait and what did the agent do during the wait time?\nInput: I had to wait for around an hour!\nOutput: Thank you for the feedback!\n\nInput: Inconvenient solution to my issue\nOutput: Could you elaborate on what kind of issue you were having and what the solution was?\nInput: I needed to reset my password and I couldn't receive the passcode on my cell phone because I'm currently working in Japan. My Japanese phone number didn't work with your system\nOutput: Thank you for the information, what did the agent do to help you resolve this issue?\nInput: Agent was not helpful at all. He said we cannot do anything\nOutput: Thank you for the feedback!\n\nInput: Clothes did not fit\nOutput: Could you provide more information about what clothes didn't fit and what you did to try and fix the issue?\nInput: I bought a shirt and it was bigger than advertised\nOutput: Thank you for the information. What did you do to try and resolve the issue?\nInput: I had to return the shirt\nOutput: Thank you for the information. Did you receive a refund or an exchange?\nInput: I asked for a refund and I got it within two days\nOutput: Thank you for the feedback!\n\nInput: the service was good\nOutput: Could you provide more details about what made the service good?\nInput: the staff was friendly\nOutput: What did the staff do that made you feel that their service was good?\nInput: they helped me choose the perfect dress for my wedding\nOutput: Thank you for the feedback!\n\nInput: I thought the wait staff was very knowledgable\nOutput: Thank you for the information. Could you provide more information about what they did that made you feel they were knowledgeable?\nInput: They answered my question accurately\nOutput: Could you tell us more specifically what question they answered accurately?\nInput: They told my the correct way to reset my password\nOutput: Thank you for the feedback!\n";

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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: DEFAULT_PROMPT + prompt, // add the prompt form the user
      max_tokens: 256,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log("Prompt to chat gpt ---->", DEFAULT_PROMPT + prompt);
    const regex = /[\s\S]*Output:/m;
    const aiResponse = response.data.choices[0].text?.replace(regex, "");
    setIsLoading(false); // stop the loading animation
    if (aiResponse) {
      setAIResponse(aiResponse); // if the AI's response is not null, set the AI's response to the state, otherwise keep the previous state
      setPromptToSend(
        (prev) => prev + "\nInput: " + prompt + "\nOutput: " + aiResponse
      );
    } else {
      setAIResponse("no response");
      setPromptToSend(
        (prev) =>
          prev +
          "\nInput: " +
          prompt +
          "\nOutput: More detail is needed to provide an adequate response."
      );
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
