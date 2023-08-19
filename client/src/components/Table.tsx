import { JourneyType } from '../models/journeysInterface';

type TableProps = {
  columns: string[];
  data: JourneyType[];
};

function TableHeader({ columns }: { columns: string[] }) {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column}>{column}</th>
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
            <td key={j}>{val}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function Table({ columns, data }: TableProps) {
  return (
    <table>
      <TableHeader columns={columns} />
      <TableBody data={data} />
    </table>
  );
}

export default Table;
