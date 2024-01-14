import { useState } from 'react';
import edit from '../styles/edit.module.css'
import { Button } from "@mui/material";

const TextCorrectionForm = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the onSubmit prop with the inputText
    await onSubmit(inputText);
  };

  return (
    <form onSubmit={handleSubmit} method="get">
      <label
      className= {edit.offCanvasTitle}
      >
        Enter paragraph here: 
      </label>
      <div>
      <textarea
          className= {edit.textArea}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)
          
          }
        />
      <Button variant="contained" color="primary" type="submit">Submit</Button>
      </div>
      
    </form>
  );
};

export default TextCorrectionForm;
