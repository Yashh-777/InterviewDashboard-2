import { useState } from "react";
import {Box, Typography, useTheme, TextField, Button} from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {tokens} from "../../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [accordions, setAccordions] = useState([]);

  const handleAddAccordion = () => {
    const newAccordion = (
      <Accordion key={accordions.length} defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            {question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
    setAccordions([...accordions, newAccordion]);
    setQuestion("");
    setAnswer("");
  };

  return (
    <Box m="20px">
      <Header title= "FAQ" subtitle="Frequently Asked Questions Page" />
      <Box mb="20px">
        <TextField
          label="Question"
          variant="outlined"
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </Box>
      <Box mb="20px">
        <TextField
          label="Answer"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </Box>
      <Box mb="20px">
        <Button variant="contained" color="secondary" onClick={handleAddAccordion}>
          <b>Add FAQ</b>
        </Button>
      </Box>
      {accordions}
    </Box>
  );
};

export default FAQ;
