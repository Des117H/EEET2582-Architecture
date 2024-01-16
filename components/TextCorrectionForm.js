import { useState } from 'react';
import edit from '../styles/edit.module.css'
import { Button } from "@mui/material";

const TextCorrectionForm = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');
  
  const maxCharacters = 128;

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
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Enter your text (max ${maxCharacters} characters)`}
          maxLength="128"
        />
      <Button variant="contained" color="primary" type="submit">Submit</Button>
      </div>
      
    </form>
  );
};

export default TextCorrectionForm;
