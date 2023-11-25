import TextInput from '../src/components/TextInput';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('TextInput', () => {
  it('should render a label and input passed by props', () => {
    const handleChange = vi.fn();

    render(<TextInput label="test" handleChange={handleChange} />);

    const label = screen.getByText('Test');
    expect(label).toBeVisible();

    const input = screen.getByRole('textbox');
    expect(input).toBeVisible();
  });

  it('should call handleChange on input change', async () => {
    const handleChange = vi.fn();

    render(<TextInput label="test" handleChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');
    expect(handleChange).toHaveBeenCalled();
  });
});
