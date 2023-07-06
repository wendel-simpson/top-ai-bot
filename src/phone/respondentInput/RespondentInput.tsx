import { Box, Button, TextField } from "@mui/material";
import { AIHelper } from "./AIHelper";
import { useState, useRef } from "react";
import { debounce } from "lodash";
import { getChatGPTResponse } from "../../utils/getGptResponse";
import { distance } from "fastest-levenshtein";
import ModalForm from "../../components/ModalForm";
import { Config } from "..";
import "./style.css";

const MAX_LENGTH = 1000;

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
  borderRadius: "5px",
  backgroundColor: "#FFF",
};

const buttonSx = {
  width: "80%",
  backgroundColor: "black",
  marginTop: "40px",
  color: "#f4f1fa",
  fontWeight: "600",
  fontSize: "1.2rem",
  borderRadius: "10px",
  "&:hover": {
    bgcolor: "#ffb04d",
    color: "common.black",
    "&::before": {
      content: `'Config'`,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& > span": {
      opacity: 0,
    },
  },
};

type Props = {
  config: Config;
  setConfig: (config: Config) => void;
};

export const RespondentInput = (props: Props) => {
  const { config, setConfig } = props;

  const [aiResponse, setAIResponse] = useState(""); // this is the response from the chat-gpt server (might not be used)
  const [promptToSend, setPromptToSend] = useState(""); // this is the prompt to send to the chat-gpt server, we always append the user's response to the prompt
  const [isLoading, setIsLoading] = useState(false); // this is the prompt to send to the chat-gpt server, we always append the user's response to the prompt
  const [error, setError] = useState(""); // this is the prompt to send to the chat-gpt server, we always append the user's response to the prompt

  // for the modal
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // resets the state when the user clicks the next button
  const nextClickHandler = () => {
    setAIResponse("");
    setPromptToSend("");
    inputRef.current?.value && (inputRef.current.value = "");
    setIsOpen(true);
  };

  const handleInputChange = debounce((e) => {
    const userResponse = e.target.value;
    const levDistance = promptToSend
      ? distance(userResponse, promptToSend)
      : 100;

    const isSimilar =
      levDistance < config.min_levenstein_distance &&
      userResponse.length >
        config.min_text_length_to_check_levenstein_distance &&
      promptToSend.length > config.min_text_length_to_check_levenstein_distance; // two texts are considered similar if they are less than 20 characters apart and both are longer than 20 characters

    if (userResponse.length > 0 && !isSimilar) {
      setIsLoading(true);
      getChatGPTResponse(
        userResponse,
        setAIResponse,
        setPromptToSend,
        setIsLoading,
        setError,
        config.question,
        config.model_name
      );
    }
  }, config.time_delay);

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
          style: { fontSize: "1rem", color: "black", fontWeight: "600" },
          onChange: handleInputChange,
          maxLength: MAX_LENGTH,
        }}
        inputRef={inputRef}
        classes={{ root: "custom-textfield" }}
      />
      <AIHelper
        aiResponse={aiResponse}
        isLoading={isLoading}
        error={error}
        config={config}
      />
      <Button sx={buttonSx} variant="contained" onClick={nextClickHandler}>
        <span>Next</span>
      </Button>
      <ModalForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setFormData={setConfig}
        config={config}
      />
    </Box>
  );
};
