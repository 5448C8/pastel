import { css, cx } from "@linaria/core";
import React, { PropsWithChildren } from "react";
import "../global";

const BasicLayout = css`
  background-color: var(--gray-2);
  padding: 12px 16px;
  display: flex;
  flex: 1;
`;

export type LayoutProps = {
  className?: string;
};

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ className, children }) => {
  return <div className={cx(BasicLayout, className)}>{children}</div>;
};

export { Layout };
