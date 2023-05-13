import React from "react";

const TableHeader = ({ columns }: { columns: string[] }) => {
  return (
    <>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
    </>
  );
};

export default TableHeader;
