import DateTimeInput from '../src/components/DateTimeInput';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

describe('DateTimeInput', () => {
  const handleChange = vi.fn(); // mock function

  it('should render a label starting with an uppercase.', () => {
    render(
      <MemoryRouter>
        <DateTimeInput
          field="starting time"
          handleChange={handleChange}
          required={true}
        />
      </MemoryRouter>
    );

    const label = screen.getByText(/Starting time/);
    expect(label).toBeVisible();
  });

  it('should handle date-time changes', () => {
    render(
      <DateTimeInput
        field="started"
        handleChange={handleChange}
        required={true}
      />
    );

    const input = screen.getByTestId('dateTimeInput') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '2021-09-01T12:00' } });
    expect(input.value).toEqual('2021-09-01T12:00');
  });
});
