import { useState, useEffect } from 'react';
import { JourneyType } from '../models/journeysInterface';
import SortAscendingIcon from '../assets/SortAscendingIcon';
import SortDescendingIcon from '../assets/SortDescendingIcon';
import { sortData } from '../utils/tableUtils';
import { StationType } from '../models/stationsInterface';

export type SortOrder = 'ascending' | 'descending';

interface TableProps<T extends JourneyType | StationType> {
  columns: string[];
  data: T[];
}

type TableHeaderProps = {
  columns: string[];
  columnIndex: number;
  setColumnIndex: (i: number) => void;
  order: SortOrder;
  setOrder: (order: SortOrder) => void;
};

function TableHeader({
  columns,
  columnIndex,
  setColumnIndex,
  order,
  setOrder,
}: TableHeaderProps) {
  // eslint-disable-next-line consistent-return
  const handleHeaderCellClick = (i: number) => {
    if (i === columnIndex) {
      return setOrder(order === 'ascending' ? 'descending' : 'ascending');
    }

    setColumnIndex(i);
    setOrder('ascending');
  };

  // eslint-disable-next-line consistent-return
  const renderSortIcon = (i: number) => {
    if (columnIndex === i && order === 'ascending')
      return <SortAscendingIcon />;
    if (columnIndex === i && order === 'descending')
      return <SortDescendingIcon />;
  };

  return (
    <thead>
      <tr className="border-y border-slate-600 bg-light-blue">
        {columns.map((column, i) => (
          <th
            key={column}
            className="py-3"
            aria-sort={i === columnIndex ? order : undefined}
          >
            <button
              type="button"
              onClick={() => handleHeaderCellClick(i)}
              className="flex flex-row items-center gap-2 mx-auto"
            >
              {column} {renderSortIcon(i)}
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody<T>({ data }: { data: T[] }) {
  return (
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {Object.values(row).map((val, j) => (
            <td key={j} className="py-3 text-center border-y border-slate-600">
              {val as string}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function Table<T extends JourneyType | StationType>({
  columns,
  data,
}: TableProps<T>) {
  const [sortingColumnIndex, setSortingColumnIndex] = useState<number>(0);
  const [sortingOrder, setSortingOrder] = useState<'ascending' | 'descending'>(
    'ascending'
  );

  const sortableData = sortData({
    data: [...data],
    columnIndex: sortingColumnIndex,
    sortOrder: sortingOrder,
  });

  return (
    <>
      <table className="w-full mt-8 mb-5">
        <TableHeader
          columns={columns}
          columnIndex={sortingColumnIndex}
          setColumnIndex={setSortingColumnIndex}
          order={sortingOrder}
          setOrder={setSortingOrder}
        />
        <TableBody data={sortableData} />
      </table>
    </>
  );
}

export default Table;
