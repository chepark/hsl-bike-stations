import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SearchFilter from '../components/SearchFilter';

describe('SearchFilter', () => {
  it('should render 10 pages.', () => {
    const validater = vi.fn();
    render(
      <SearchFilter
        label="search name"
        placeholder="enter name"
        pattern="[A-Za-z]{3}"
      />
    );

    const lastPageButton = screen.getByText(/10/);
    expect(lastPageButton).toBeVisible();

    const lastPage = screen.queryByText(/30/);
    expect(lastPage).toBeNull();
  });
});
