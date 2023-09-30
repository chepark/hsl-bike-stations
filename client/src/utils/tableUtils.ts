import { JourneyType } from '../models/journeysInterface';

export const journeyColumns = [
  'ID',
  'Starting Station',
  'Ending Station',
  'Distance (m)',
  'Duration (s)',
];

// TODO: add more data types
export const sortData = ({
  data,
  columnIndex,
  sortOrder,
}: {
  data: JourneyType[];
  columnIndex: number;
  sortOrder: 'ascending' | 'descending';
}) => {
  return data.sort((a, b) => {
    const key = Object.keys(data[0])[columnIndex];
    const valA = a[key as keyof JourneyType];
    const valB = b[key as keyof JourneyType];

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

/**
 * Generates ranges for the filter dropdowns
 */
export const generateRanges = ({
  min,
  max,
}: {
  min: number;
  max: number;
}) => {};
