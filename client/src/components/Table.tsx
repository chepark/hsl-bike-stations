import { JourneyType } from '../models/journeysInterface';

type TableProps = {
  columns: string[];
  data: JourneyType[];
};

function TableHeader({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr className="border-y border-slate-600 bg-light-blue">
        {columns.map((column) => (
          <th key={column} className="py-3">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({ data }: { data: JourneyType[] }) {
  return (
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {Object.values(row).map((val, j) => (
            <td key={j} className="py-3 text-center border-y border-slate-600">
              {val}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function Table({ columns, data }: TableProps) {
  return (
    <table className="w-full mt-8 mb-5">
      <TableHeader columns={columns} />
      <TableBody data={data} />
    </table>
  );
}

export default Table;
