import React from 'react';
import { firstCharToUpperCase } from '../utils/textUtils';

type DateTimeInputProps = {
  field: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

function DateTimeInput({ field, handleChange, required }: DateTimeInputProps) {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={field}>{firstCharToUpperCase(field)}</label>
      <input
        data-testid="dateTimeInput"
        type="datetime-local"
        name={field}
        onChange={handleChange}
        required={required}
        className="p-2 border rounded"
      />
    </div>
  );
}

export default DateTimeInput;
