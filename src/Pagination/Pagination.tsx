import { css, cx } from "@linaria/core";
import React, { memo } from "react";

export type PaginationProps = {
  current?: number;
  pageSize: number;
  totalSize: number;
  className?: string;
};

const PaginationContainer = css`
  border-radius: 4px;
`;

const PaginationItem = css`
  padding: 6px;
`;

const Pagination: React.FC<PaginationProps> = ({ current, pageSize, totalSize, className }) => {
  const totalPages = Math.ceil(Math.min(totalSize / pageSize, 1));
  return (
    <div className={cx(PaginationContainer, className)}>
      <div className={PaginationItem} />
    </div>
  );
};

export default memo(Pagination);
