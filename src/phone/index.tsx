import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import { Question } from "./question/Question";
import { RespondentInput } from "./respondentInput/RespondentInput";
import { LogoAlida } from "../assets/logo-alida";

const boxSx = {
  width: "390px",
  height: "630px",
  backgroundColor: "black",
  borderRadius: "50px",
  margin: "50px auto",
  overflow: "hidden",
  boxShadow: "0 0 20px 0 rgba(0,0,0,0.3)",
  fontSize: "1.2rem",
  fontWeight: "600",
  fontFamily: "sans-serif",
};

const screenSx = {
  width: "363px",
  height: "605px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  margin: "14px auto",
  borderRadius: "40px",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.3)",
  backgroundColor: "#fff",
};

export type Config = {
  default_prompt: string;
  time_delay: number;
  min_levenstein_distance: number;
  min_text_length_to_check_levenstein_distance: number;
  is_streaming: boolean;
  streaming_time_delay: number;
};

// feed this in as a prop and use it to set the initial state... then we will have an input in the UI to change the config :)
export const INITIAL_CONFIG: Config = {
  default_prompt:
    "Ask questions based on input and provide prompts, which help respondents to write better answers, as the output. If the input has even one incomplete sentence, output should be blank but output prompts for phrases. Output should be \"Thank you for the feedback!\" if input is detailed enough.\n\nInput: Poor customer service\nOutput: Please provide more details about your experience with customer service?\n###\nInput: The agent was rude and unhelpful\nOutput: Could you tell us more about what happened specifically?\n###\nInput: The agent shouted at me and cut the call without giving me any resolution\nOutput: What did you need help with that the agent did not provide you with a resolution for?\n###\nInput: I wanted to know how to deposit a check\nOutput: Thank you for the feedback!\n###\nInput: Good interaction.\nOutput: Could you tell us more about what made the interaction positive?\n###\nInput: Good interaction. Agent was helpful and resolved my issue in record time!\nOutput: What issue were you having and what did the agent do to help you?\n###\nInput: Good interaction. Agent was helpful and resolved my issue in record time! I was having an issue with my mobile app. I was not able to login. The agent helped me to login by resetting my password\nOutput: Thank you for the feedback!\n###\nInput: Inconvenient solution to my issue\nOutput: Could you elaborate on what kind of issue you were having and what the solution was?\n###\nInput: Inconvenient solution to my issue I needed to reset my password and I couldn't receive the passcode on my cell phone because I'm currently working in Japan. My Japanese phone number didn't work with your system\nOutput: Thank you for the information, what did the agent do to help you resolve this issue?\n###\nInput: Inconvenient solution to my issue I needed to reset my password and I couldn't receive the passcode on my cell phone because I'm currently working in Japan. My Japanese phone number didn't work with your system. Agent was not helpful at all. He said we cannot do anything\nOutput: Thank you for the feedback!\n###\nInput: the service was good\nOutput: Could you provide more details about what made the service good?\n###\nInput: the service was good. the staff was friendly\nOutput: What did the staff do that made you feel that their service was good?\n###\nInput: the service was good. the staff was friendly. they helped me choose the perfect dress for my wedding\nOutput: Thank you for the feedback!\n###\nInput: Service was\nOutput:\n###\nInput: Service was good\nOutput: Could you provide more details about what made the service good?\n###\nInput: Service was good. Staff was responsive.\nOutput: What did the staff do that made you feel their service was responsive?\n###\nInput: Service was good. Staff was responsive. They took my orders promptly\nOutput: Thank you for the feedback!",
  time_delay: 2000,
  min_levenstein_distance: 15,
  min_text_length_to_check_levenstein_distance: 20,
  is_streaming: true,
  streaming_time_delay: 50,
};

export const Phone = () => {
  const [config, setConfig] = useState(INITIAL_CONFIG); // adjustable config for UX designers and product managers

  return (
    <Box sx={boxSx}>
      <Paper sx={screenSx}>
        <LogoAlida />
        <Question />
        <RespondentInput config={config} setConfig={setConfig} />
      </Paper>
    </Box>
  );
};
