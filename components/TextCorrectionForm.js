import { useState } from 'react';

const TextCorrectionForm = ({ onSubmit }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the onSubmit prop with the inputText
    await onSubmit(inputText);
  };

  return (
    <form onSubmit={handleSubmit} method="get">
      <label>
        Manuscript:
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TextCorrectionForm;
