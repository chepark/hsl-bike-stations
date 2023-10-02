import { JourneyType } from '../models/journeysInterface';
import { StationType } from '../models/stationsInterface';

export const journeyColumns = [
  'ID',
  'Starting Station',
  'Ending Station',
  'Distance (m)',
  'Duration (s)',
];

export const sortData = <T extends JourneyType | StationType>({
  data,
  columnIndex,
  sortOrder,
}: {
  data: T[];
  columnIndex: number;
  sortOrder: 'ascending' | 'descending';
}) => {
  return data.sort((a, b) => {
    const key = Object.keys(data[0])[columnIndex];
    const valA = a[key as keyof (JourneyType | StationType)];
    const valB = b[key as keyof (JourneyType | StationType)];

    if (sortOrder === 'ascending') {
      if (typeof valA === 'number' && typeof valB === 'number') {
        return valA - valB;
      }
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valA.localeCompare(valB);
      }
    }

    if (sortOrder === 'descending') {
      if (typeof valA === 'number' && typeof valB === 'number') {
        return valB - valA;
      }
      if (typeof valA === 'string' && typeof valB === 'string') {
        return valB.localeCompare(valA);
      }
    }
    return 0;
  });
};

export const stationColumns = ['Id', 'Stations'];
