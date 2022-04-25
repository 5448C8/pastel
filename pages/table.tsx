import { useCallback, useMemo, useState } from "react";
import { Table, TableColumn, SortArrow, Tag, IconButton } from "../build";
import { Edit, Trash } from "../icons";
import tableData from "./table.json";

interface IndaqParameter {
  parameter_id: string;
  project_id: string;
  name: string;
  interval: number;
  address: string;
  scale: number;
  interface_id?: string | null;
  tags: string[];
}

const TablePage = () => {
  const columns: Array<TableColumn<IndaqParameter>> = useMemo(() => {
    return [
      {
        key: "name",
        title: "Name",
        dataIndex: "name",
      },
      {
        key: "tags",
        title: "Tags",
        renderItem(item) {
          return item.tags.map((tag) => {
            return <Tag key={tag}>{tag}</Tag>;
          });
        },
      },
      {
        key: "preview",
        title: "Preview",
        align: "center",
      },
      {
        key: "interval",
        title: "Interval",
        align: "right",
        sortable: true,
        renderItem(item) {
          return <>{item.interval}s</>;
        },
      },
      {
        key: "address",
        title: "Address",
        dataIndex: "address",
      },
      {
        key: "scale",
        title: "Scale",
        align: "right",
        dataIndex: "scale",
      },
      {
        key: "used",
        title: "Used",
        align: "center",
        width: "0",
      },
      {
        key: "interface",
        title: "Interface",
        align: "center",
        renderItem(item) {
          return <>{"production-interface"}</>;
        },
      },
      {
        key: "actions",
        align: "center",
        renderItem(item) {
          return (
            <div
              style={{
                display: "inline-flex",
              }}>
              <IconButton size={"small"} icon={<Edit />} />
              <IconButton danger size={"small"} icon={<Trash />} />
            </div>
          );
        },
      },
    ] as Array<TableColumn<IndaqParameter>>;
  }, []);
  const [d, setD] = useState<"up" | "down">("up");
  const rowKey = useCallback((row: IndaqParameter) => {
    return row.parameter_id;
  }, []);
  const [field, setField] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<"asc" | "desc" | undefined>(undefined);
  return (
    <div style={{ display: "flex", gap: 12, flexDirection: "column", flex: 1 }}>
      <h2>Table</h2>
      <div style={{ padding: 8, background: "#fff", maxWidth: 1600 }}>
        <Table
          rowKey={rowKey}
          columns={columns}
          data={tableData as IndaqParameter[]}
          sortField={field}
          sortDirection={sort}
          onSortChange={(f, d) => {
            setField(f);
            setSort(d);
          }}
        />
      </div>
      <div>
        <SortArrow
          direction={d}
          onClick={() => {
            setD((old) => {
              return old === "down" ? "up" : "down";
            });
          }}
        />
      </div>
    </div>
  );
};

export default TablePage;
