import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import { MemoryRouter } from 'react-router-dom'; // it is needed for useSearchParams

describe('Pagination', () => {
  it('should render 10 pages.', () => {
    const setCurrentPage = vi.fn();

    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          totalPages={30}
          changeCurrentPage={setCurrentPage}
        />
      </MemoryRouter>
    );

    const lastPageButton = screen.getByText(/10/);
    expect(lastPageButton).toBeVisible();

    const lastPage = screen.queryByText(/30/);
    expect(lastPage).toBeNull();
  });

  it('should not render a page greater than 10', () => {
    const setCurrentPage = vi.fn();

    render(
      <MemoryRouter>
        <Pagination
          currentPage={2}
          totalPages={30}
          changeCurrentPage={setCurrentPage}
        />
      </MemoryRouter>
    );

    const lastPage = screen.queryByText(/30/);
    expect(lastPage).toBeNull();
  });

  it('should update currentPage.', async () => {
    const setCurrentPage = vi.fn();
    render(
      <MemoryRouter>
        <Pagination
          currentPage={1}
          totalPages={30}
          changeCurrentPage={setCurrentPage}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /7/ }));
    expect(setCurrentPage).toHaveBeenCalledWith(7);
  });
});
