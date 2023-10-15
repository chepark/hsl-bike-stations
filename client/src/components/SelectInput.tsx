import React from 'react';
import { firstCharToUpperCase } from '../utils/textUtils';

type SelectInputProps = {
  field: string;
  options: string[];
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectInput({ field, options, handleChange }: SelectInputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={field}>{firstCharToUpperCase(field)}</label>
      <select
        name={field}
        className="py-2 border rounded"
        onChange={handleChange}
      >
        {options.map((option, i) => (
          <option key={i} value={option}>
            {firstCharToUpperCase(option)}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput;
