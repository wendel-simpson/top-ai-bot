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
  time_delay: number;
  min_levenstein_distance: number;
  model_name: string;
  min_text_length_to_check_levenstein_distance: number;
  is_streaming: boolean;
  streaming_time_delay: number;
  question: string;
};

// feed this in as a prop and use it to set the initial state... then we will have an input in the UI to change the config :)
export const INITIAL_CONFIG: Config = {
  time_delay: 2000,
  min_levenstein_distance: 15,
  model_name: "curie:ft-alida-2023-03-29-00-13-42",
  min_text_length_to_check_levenstein_distance: 20,
  is_streaming: true,
  streaming_time_delay: 50,
  question: "How was your experience on our platform?",
};

export const Phone = () => {
  const [config, setConfig] = useState(INITIAL_CONFIG); // adjustable config for UX designers and product managers

  return (
    <Box sx={boxSx}>
      <Paper sx={screenSx}>
        <LogoAlida />
        <Question question={config.question} />
        <RespondentInput config={config} setConfig={setConfig} />
      </Paper>
    </Box>
  );
};
