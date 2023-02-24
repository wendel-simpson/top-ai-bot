import React from "react";
import { Box, Paper } from "@mui/material";
import { Question } from "./question/Question";
import { RespondentInput } from "./respondentInput/RespondentInput";

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
  backgroundImage: `url('https://cdn.pixabay.com/photo/2017/08/25/18/48/watercolor-2681039_1280.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  margin: "14px auto",
  borderRadius: "40px",
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.3)",
};

export const Phone = () => {
  return (
    <Box sx={boxSx}>
      <Paper sx={screenSx}>
        <Question />
        <RespondentInput />
      </Paper>
    </Box>
  );
};
