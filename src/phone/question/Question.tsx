import { Paper } from "@mui/material";
import { Box } from "@mui/material";

const questionSx = {
  padding: "0  10px",
  display: "flex",
  width: "100%",
  height: "120px",
  backgroundColor: "#a442f5",
  margin: "80px 20px 0",
  borderRadius: "5x",
  alignItems: "center",
  color: "#f4f1fa",
};

const containerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
};

const QUESTION = "How would you describe your experience on our platform?";

export const Question = () => {
  return (
    <Box sx={containerSx}>
      <Paper sx={questionSx}>
        <p>{QUESTION}</p>
      </Paper>
    </Box>
  );
};
