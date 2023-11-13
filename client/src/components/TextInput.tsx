import React from 'react';
import { firstCharToUpperCase } from '../utils/textUtils';

type TextInputProps = {
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextInput({ label, handleChange }: TextInputProps) {
  return (
    <div className="mb-4">
      <label htmlFor="textInput">{firstCharToUpperCase(label)}</label>
      <input
        className="w-full px-4 py-2 border rounded"
        type="text"
        onChange={handleChange}
      />
    </div>
  );
}

export default TextInput;
