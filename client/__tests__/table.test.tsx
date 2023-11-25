import Table from '../src/components/Table';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Table', () => {
  it('should render a table with the correct number of columns and rows', () => {
    const columns = ['column1', 'column2', 'column3', 'column4', 'column5'];
    const data = [
      {
        journey_id: 1,
        startingStation_name: 'startingstation1',
        endingStation_name: 'ending statioin1',
        route_distance_meter: 10,
        journey_duration_sec: 100,
      },
      {
        journey_id: 2,
        startingStation_name: 'startingstation2',
        endingStation_name: 'ending statioin2',
        route_distance_meter: 20,
        journey_duration_sec: 200,
      },
    ];

    render(<Table columns={columns} data={data} />);

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBe(3);

    const columnsInTable = screen.getAllByRole('columnheader');
    expect(columnsInTable.length).toBe(5);
  });

  // TODO: test for sorting.
});
