import React, { memo } from "react";

export type TableColumnProps<Data> = {
  renderItem?: (record: Data) => React.ReactNode;
};
export type TableProps<Data> = {
  data?: Data[];
};

function Table<Data>(props: TableProps<Data>) {
  return <table />;
}

export default memo(Table);
