import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import Form from '../src/components/Form';

describe('Form', () => {
  it('should render children', () => {
    const { getByText } = render(
      <Form handleSubmit={() => {}}>Test Children</Form>
    );
    expect(getByText('Test Children')).toBeInTheDocument();
  });

  it('should call handleSubmit on form submission', () => {
    const mockSubmit = vi.fn();
    render(<Form handleSubmit={mockSubmit}>Test</Form>);

    const form = screen.getByTestId('form');
    fireEvent.submit(form);
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('should render a button with label', () => {
    render(
      <Form handleSubmit={() => {}} buttonLabel="Submit">
        Test
      </Form>
    );

    const button = screen.getByText('Submit');
    expect(button).toBeInTheDocument();
  });

  it('applies custom classNames', () => {
    render(
      <Form handleSubmit={() => {}} classNames="custom-class">
        Test
      </Form>
    );

    const form = screen.getByTestId('form');
    expect(form).toHaveClass('custom-class');
  });
});
