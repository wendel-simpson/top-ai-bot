import { Box, Button, TextField } from "@mui/material";
import { AIHelper } from "./AIHelper";
import { useState, useRef } from "react";
import { debounce } from "lodash";
import { getChatGPTResponse } from "../../utils/getGptResponse";

const paperSx = {
  display: "flex",
  height: "170px",
  backgroundColor: "#FFF",
  margin: "15px 20px 0",
  borderRadius: "5x",
  borderRadiusBottom: 0,
  alignItems: "center",
};

const textFieldSx = {
  width: "100%",
  border: "none",
  borderRadius: "",
};

const buttonSx = {
  width: "80%",
  backgroundColor: "#a442f5",
  marginTop: "40px",
  color: "#f4f1fa",
  fontWeight: "600",
  fontSize: "1.2rem",
};

export const RespondentInput = () => {
  const [aiResponse, setAIResponse] = useState(""); // this is the response from the chat-gpt server (might not be used)
  const [promptToSend, setPromptToSend] = useState(""); // this is the prompt to send to the chat-gpt server, we always append the user's response to the prompt
  const [isLoading, setIsLoading] = useState(false); // this is the prompt to send to the chat-gpt server, we always append the user's response to the prompt
  const inputRef = useRef<HTMLInputElement>(null);

  // resets the state when the user clicks the next button
  const nextClickHandler = () => {
    setAIResponse("");
    setPromptToSend("");
    inputRef.current?.value && (inputRef.current.value = "");
  };

  const handleInputChange = debounce((e) => {
    const userResponse = e.target.value;
    setAIResponse("");
    if (userResponse.length > 0) {
      setIsLoading(true);
      getChatGPTResponse(
        promptToSend + "\nInput: " + userResponse,
        setAIResponse,
        setPromptToSend,
        setIsLoading
      );
    } else {
      setPromptToSend("");
    }
  }, 1000);

  return (
    <Box sx={paperSx} display="flex" flexDirection="column">
      <TextField
        sx={textFieldSx}
        id="outlined-multiline-static"
        placeholder="Enter your response here..."
        multiline
        rows={6}
        variant="outlined"
        inputProps={{
          style: { fontSize: "1rem", color: "#777", fontWeight: "600" },
          onChange: handleInputChange,
        }}
        inputRef={inputRef}
      />
      <AIHelper
        aiResponse={aiResponse}
        isLoading={isLoading}
        promptToSend={promptToSend}
      />
      <Button sx={buttonSx} variant="contained" onClick={nextClickHandler}>
        Clear
      </Button>
    </Box>
  );
};
