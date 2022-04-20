import { Table } from "../build";

const TablePage = () => {
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
      <h2>Table</h2>
      <Table />
    </div>
  );
};

export default TablePage;
