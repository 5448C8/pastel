import { css, cx } from "@linaria/core";
import React, { memo, useCallback, useMemo } from "react";
import SortArrow from "./SortArrow";

const AlignLeft = css`
  text-align: left;
`;
const AlignCenter = css`
  text-align: center;
`;
const AlignRight = css`
  text-align: right;
`;

const ColumnHeader = css`
  &:first-child {
    border-top-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-right: 1px solid var(--gray-3);
  }

  background-color: var(--gray-2);

  padding: 8px 12px;

  font-size: 16px;
  line-height: 18px;
  font-weight: 500;

  border-left: 1px solid var(--gray-3);
  border-top: 1px solid var(--gray-3);
`;

const BasicTable = css`
  border-spacing: 0;
  width: 100%;
  font-size: 14px;
`;

export type ColumnAlign = "left" | "center" | "right";
export type TableColumn<Data> = {
  key: string;
  dataIndex?: keyof Data;
  title?: React.ReactNode;
  renderItem?: (record: Data) => React.ReactNode;
  width?: number | string;
  align?: ColumnAlign;
  sortable?: boolean;
};
export type SortDirection = "asc" | "desc";
export type TableProps<Data> = {
  data?: Data[];
  columns?: Array<TableColumn<Data>>;
  rowKey: (item: Data) => React.Key;
  sortField?: string;
  sortDirection?: SortDirection;
  onSortChange?: (field?: string, direction?: SortDirection) => void;
};

function Table<Data extends unknown = any>({
  columns,
  data,
  rowKey,
  sortField,
  sortDirection,
  onSortChange,
}: TableProps<Data>) {
  const colgroup = useMemo(() => {
    return (
      <colgroup>
        {columns?.map((col) => {
          return <col key={col.key} width={col.width} />;
        })}
      </colgroup>
    );
  }, [columns]);
  const renderColumnHeader = useCallback(
    (col: TableColumn<Data>) => {
      return (
        <th
          onClick={
            col.sortable
              ? () => {
                  let nextSortDirection: SortDirection | undefined = undefined;
                  if (col.key !== sortField) {
                    nextSortDirection = "asc";
                  } else {
                    if (sortDirection === "asc") {
                      nextSortDirection = "desc";
                    } else if (sortDirection === "desc") {
                      nextSortDirection = undefined;
                    } else {
                      nextSortDirection = "asc";
                    }
                  }

                  onSortChange?.(nextSortDirection ? col.key : undefined, nextSortDirection);
                }
              : undefined
          }
          className={cx(
            ColumnHeader,
            col.sortable &&
              css`
                cursor: pointer;
                transition: background 0.15s ease-out;
                &:hover {
                  background-color: var(--gray-3);
                }
              `
          )}
          key={col.key}>
          <div
            className={css`
              display: inline-flex;
              flex-direction: row;
              align-items: center;
            `}>
            <span
              className={cx(
                css`
                  flex: 1 1;
                `,
                (col.align === "left" || !col.align) && AlignLeft,
                col.align === "center" && AlignCenter,
                col.align === "right" && AlignRight
              )}>
              {col.title}
            </span>
            {col.sortable && (
              <span
                className={cx(
                  css`
                    margin-left: 4px;
                    transition: color 0.5s cubic-bezier(0.22, 1, 0.36, 1);
                  `,
                  sortField !== col.key &&
                    css`
                      color: var(--gray-4);
                    `,
                  sortField === col.key &&
                    css`
                      color: var(--primary-4);
                    `
                )}>
                <SortArrow direction={sortField === col.key ? (sortDirection === "asc" ? "up" : "down") : "up"} />
              </span>
            )}
          </div>
        </th>
      );
    },
    [sortDirection, sortField, onSortChange]
  );
  const header = useMemo(() => {
    return (
      <thead>
        <tr
          className={css`
            border-radius: 6px;
          `}>
          {columns?.map((col) => {
            return renderColumnHeader(col);
          })}
        </tr>
      </thead>
    );
  }, [columns, renderColumnHeader]);

  const renderCell = useCallback((row: Data, column: TableColumn<Data>) => {
    let body: React.ReactNode = null;
    if (column.renderItem) {
      body = column.renderItem(row);
    } else if (column.dataIndex) {
      body = row[column.dataIndex] as any;
    }

    return (
      <td
        className={cx(
          css`
            padding: 8px;
            border-top: 1px solid var(--gray-3);
            border-left: 1px solid var(--gray-3);
            &:last-child {
              border-right: 1px solid var(--gray-3);
            }
            overflow-wrap: break-word;

            tr:last-child & {
              border-bottom: 1px solid var(--gray-3);
            }
            tr:last-child &:first-child {
              border-bottom-left-radius: 8px;
            }
            tr:last-child &:last-child {
              border-bottom-right-radius: 8px;
            }
            tr:hover & {
              background-color: var(--gray-1);
            }
          `,
          (column.align === "left" || !column.align) && AlignLeft,
          column.align === "center" && AlignCenter,
          column.align === "right" && AlignRight
        )}
        key={column.key}>
        {body}
      </td>
    );
  }, []);

  const renderRow = useCallback(
    (row: Data) => {
      return (
        <tr
          key={rowKey(row)}
          className={css`
            &:nth-child(even) {
            }
          `}>
          {columns?.map((column) => {
            return renderCell(row, column);
          })}
        </tr>
      );
    },
    [columns]
  );

  const body = useMemo(() => {
    return (
      <tbody>
        {data?.map((row) => {
          return renderRow(row);
        })}
      </tbody>
    );
  }, [renderRow, data]);
  return (
    <table className={BasicTable}>
      {colgroup}
      {header}
      {body}
    </table>
  );
}

/// This weird type conversion is needed because when we wrap our component in memo() we lose
/// the generic information. Since memo doesn't actually change anything about our component,
/// we convert it back to the property type.
export default memo(Table) as <Data extends unknown = any>(props: TableProps<Data>) => React.ReactElement;
