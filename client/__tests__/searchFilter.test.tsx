import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilter from '../src/components/SearchFilter';

describe('SearchFilter', () => {
  it('should display label.', () => {
    render(
      <SearchFilter
        label="search name"
        placeholder="enter name"
        pattern="text"
      />
    );

    const label = screen.getByText(/search name/);
    expect(label).toBeVisible();
  });

  it('should execute handleChange on input changes.', () => {
    const handleChange = vi.fn(); // mock function

    render(
      <SearchFilter
        label="search name"
        placeholder="enter name"
        pattern="text"
        handleChange={handleChange}
      />
    );

    const input = screen.getByTestId('search-filter') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
