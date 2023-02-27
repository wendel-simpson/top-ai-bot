import { Box } from "@mui/material";
import { Message } from "@mui/icons-material";
import { BouncingDotsLoader } from "../../components/BouncingDotsLoader";
import { useEffect, useState } from "react";
import { Config } from "..";

const paperSx = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "300px",
  backgroundColor: "#eee",
  fontSize: "0.9rem",
  gap: "15px",
  padding: "0 10px",
  color: "#777",
};

const DEFAULT_PROMPT = "Additional prompts will be displayed here...";

type Props = {
  aiResponse: string;
  isLoading: boolean;
  error: string;
  config: Config;
};

export const AIHelper = (props: Props) => {
  const { aiResponse, isLoading, error, config } = props;

  const { is_streaming, streaming_time_delay } = config;
  const [outputText, setOutputText] = useState("");

  useEffect(() => {
    if ((aiResponse || error) && !isLoading) {
      const words = error ? error.split(" ") : aiResponse.split(" ");

      let index = 0;
      const displayWord = () => {
        if (index >= words.length - 1) return;

        setOutputText((prev) => {
          if (index === 0) {
            return words[0] + " " + words[1];
          } else {
            return prev + " " + words[index];
          }
        });
        index++;
        setTimeout(
          displayWord,
          is_streaming && streaming_time_delay ? streaming_time_delay : 0
        ); // if no delay, then it will just display the whole thing at once!
      };
      displayWord();
    }
  }, [
    aiResponse,
    isLoading,
    setOutputText,
    error,
    is_streaming,
    streaming_time_delay,
  ]);

  return (
    <Box sx={paperSx}>
      <Message fontSize="large" sx={{ color: "black" }} />
      {isLoading ? (
        <BouncingDotsLoader />
      ) : (
        <div
          style={{ display: "flex", alignItems: "center", minHeight: "30px" }}
        >
          {!error ? (
            <p style={{ textAlign: "left" }}>
              {aiResponse ? outputText : DEFAULT_PROMPT}
            </p>
          ) : (
            <p style={{ textAlign: "left", color: "red" }}></p>
          )}
        </div>
      )}
    </Box>
  );
};
