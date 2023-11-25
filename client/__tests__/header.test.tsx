import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from '../src/components/Header/Header';

describe('Header', () => {
  it('should render navigation menu.', () => {
    // desktop width
    global.innerWidth = 1024;

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const jouneys = screen.getByText(/Journeys/i);
    expect(jouneys).toBeInTheDocument();

    const bikeStations = screen.getByText(/Bike Stations/i);
    expect(bikeStations).toBeInTheDocument();

    const addStation = screen.getByText(/Add Station/i);
    expect(addStation).toBeInTheDocument();
  });

  it('should render a hamburger menu.', () => {
    // mobile width
    global.innerWidth = 480;

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const jouneys = screen.getByText(/Journeys/i);
    expect(jouneys).not.toBeVisible();

    const bikeStations = screen.getByText(/Bike Stations/i);
    expect(bikeStations).not.toBeVisible();

    const addStation = screen.getByText(/Add Station/i);
    expect(addStation).not.toBeVisible();
  });
});
