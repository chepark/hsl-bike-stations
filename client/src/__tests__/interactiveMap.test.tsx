import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import InteractiveMap from '../components/InteractiveMap';

// TODO: find a way to mock leaflet map
describe('InteractiveMap', () => {
  it('should render a map.', async () => {
    // station_id: number;
    // station_name: string;
    // station_address: string;
    // station_longitude: string;
    // station_latitude: string;
    const fakeStations = [
      {
        station_id: 1,
        station_name: 'station1',
        station_address: 'address1',
        station_longitude: '24.9458',
        station_latitude: '60.1920',
      },
      {
        station_id: 2,
        station_name: 'station2',
        station_address: 'address2',
        station_longitude: '24.9346',
        station_latitude: '60.1617',
      },
    ];

    render(<InteractiveMap data={fakeStations} />);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
