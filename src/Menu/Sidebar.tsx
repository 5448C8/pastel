import { css, cx } from "@linaria/core";
import React, { memo, PropsWithChildren } from "react";
import "../global";

const BasicSidebar = css`
  background-color: var(--pure-white);
  width: 64px;
  overflow: hidden;
`;

const SidebarList = css`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export type SidebarProps = {
  className?: string;
};

const Sidebar: React.FC<PropsWithChildren<SidebarProps>> = ({ className, children }) => {
  return (
    <aside className={cx(BasicSidebar, className)}>
      <ul role={"menu"} className={SidebarList}>
        {children}
      </ul>
    </aside>
  );
};

const BasicSidebarItemActive = css``;
const BasicSidebarItem = css`
  cursor: pointer;
  &,
  .pastel-icon {
    height: 40px;
    font-size: 16px;
    line-height: 40px;
  }
  padding: 0 calc(50% - 8px);
  &:hover {
    color: var(--primary-2);
    background-color: var(--gray-1);
  }

  margin: 6px 0;
  display: block;
  position: relative;
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
  &.${BasicSidebarItemActive} {
    color: var(--primary-4);
  }

  & > *:not(.pastel-icon) {
    display: inline-block;
    opacity: 0;
  }

  & .pastel-icon {
    display: block;
  }

  & a::before {
    background-color: transparent;
    bottom: 0;
    content: "";
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export type SidebarItemProps = {
  className?: string;
  active?: boolean;
  onClick?: boolean;
};

const SidebarItem: React.FC<PropsWithChildren<SidebarItemProps>> = ({ className, active, children }) => {
  return (
    <li role={"menuitem"} className={cx(BasicSidebarItem, active && BasicSidebarItemActive, className)}>
      {children}
    </li>
  );
};

const SidebarItemMemo = memo(SidebarItem);

export default memo(Sidebar);
export { SidebarItemMemo as SidebarItem };
