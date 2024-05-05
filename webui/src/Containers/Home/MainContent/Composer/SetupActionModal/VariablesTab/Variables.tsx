import { FC } from "react";
import { TableBuilder, TableBuilderColumn } from "baseui/table-semantic";

type Row = {
  name: string;
  value: string;
  updated: string;
};

const Variables: FC = () => {
  return (
    <TableBuilder
      data={[]}
      overrides={{
        TableHeadCell: {
          style: ({ $theme }) => ({
            fontFamily: $theme.primaryFontFamily,
          }),
        },
      }}
    >
      <TableBuilderColumn header="Name">
        {(row: Row) => <div>{row.name}</div>}
      </TableBuilderColumn>
      <TableBuilderColumn header="Value">
        {(row: Row) => <div>{row.value}</div>}
      </TableBuilderColumn>
      <TableBuilderColumn header="Last updated">
        {(row: Row) => <div>{row.updated}</div>}
      </TableBuilderColumn>
    </TableBuilder>
  );
};

export default Variables;
