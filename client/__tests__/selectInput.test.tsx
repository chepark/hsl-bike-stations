import SelectInput from '../src/components/SelectInput';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('SelectInput', () => {
  it('should render a label and options passed by props', () => {
    const handleChange = vi.fn();

    render(
      <SelectInput
        field="test"
        options={['test1', 'test2']}
        handleChange={handleChange}
        required
      />
    );

    const label = screen.getByText('Test');
    expect(label).toBeVisible();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(2);
  });

  // reference: https://stackoverflow.com/a/74228234/18850353
  it('should select correct value on change', async () => {
    const handleChange = vi.fn();

    render(
      <SelectInput
        field="test"
        options={['option1', 'option2']}
        handleChange={handleChange}
        required
      />
    );

    const user = userEvent.setup();
    // user select option 2
    await user.selectOptions(screen.getByRole('combobox'), 'option2');
    // check option 2 is selected
    const optionTest2 = screen.getByRole('option', {
      name: /option2/i,
    }) as HTMLOptionElement;
    expect(optionTest2.selected).toBeTruthy();
  });
});
