import { Paper } from "@mui/material";
import { Box } from "@mui/material";

const questionSx = {
  padding: "0  10px",
  display: "flex",
  width: "100%",
  height: "120px",
  color: "#fff",
  margin: "-15px 20px 0",
  borderRadius: "10px",
  alignItems: "center",
  backgroundColor: "black",
  lineHeight: "1.4",
};

const containerSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
};

type Props = {
  question: string;
};

export const Question = (props: Props) => {
  const { question } = props;

  return (
    <Box sx={containerSx}>
      <Paper sx={questionSx}>
        <p>{question}</p>
      </Paper>
    </Box>
  );
};
