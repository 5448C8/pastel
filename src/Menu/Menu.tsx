import { css, cx } from "@linaria/core";
import React, { createContext, memo, PropsWithChildren, useContext, useMemo } from "react";
import "../global";

interface ActiveKeys {
  ids: React.Key[];
  depth: number;
}

const ActiveKeysContext = createContext<ActiveKeys>({
  ids: [],
  depth: 0,
});

const BasicMenu = css`
  background-color: var(--pure-white);
  width: 200px;
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

type InternalMenuProps = {
  className?: string;
};

const InternalMenu: React.FC<PropsWithChildren<InternalMenuProps>> = ({ className, children }) => {
  return <ul className={cx(BasicMenu, className)}>{children}</ul>;
};

export type MenuProps = {
  className?: string;
  activeKeys?: React.Key[];
};

const Menu: React.FC<PropsWithChildren<MenuProps>> = ({ className, activeKeys, children }) => {
  const rootValue: ActiveKeys = useMemo(() => {
    return {
      ids: activeKeys ?? [],
      depth: 0,
    };
  }, [activeKeys]);
  return (
    <ActiveKeysContext.Provider value={rootValue}>
      <InternalMenu className={className}>{children}</InternalMenu>
    </ActiveKeysContext.Provider>
  );
};

const BaseMenuItem = css`
  cursor: pointer;
  display: block;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  position: relative;
`;

const BasicMenuItem = css`
  padding: 4px 4px;
`;

const BasicMenuItemActive = css``;

const MenuItemInner = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;

  & > span {
    flex: 1;
  }

  .pastel-icon {
    margin-right: 8px;
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

const BasicMenuItemInner = css`
  border-radius: 6px;
  .${BasicMenuItem}:hover & {
    background-color: var(--gray-2);
  }

  .${BasicMenuItem} &.${BasicMenuItemActive} {
    background-color: var(--gray-3);
  }
`;

function useIsActive(id?: React.Key): boolean {
  const activeKeys = useContext(ActiveKeysContext);

  return useMemo(() => {
    return id ? activeKeys.ids.includes(id) : false;
  }, [id, activeKeys]);
}

export type MenuItemProps = {
  className?: string;
  id?: React.Key;
  icon?: React.ReactNode;
};
const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({ className, id, icon, children }) => {
  const isActive = useIsActive(id);
  return (
    <li className={cx(BaseMenuItem, BasicMenuItem, className)}>
      <span className={cx(MenuItemInner, BasicMenuItemInner, isActive && BasicMenuItemActive)}>
        {icon}
        <span>{children}</span>
      </span>
    </li>
  );
};

const BasicSubmenu = css`
  overflow: hidden;
  margin: 0;
  padding: 0;
  list-style-type: none;

  border-left: 1px solid var(--button-disabled);
`;

const SubmenuActiveItem = css`
  color: var(--primary-4);
`;

const SubmenuTitle = css`
  &.${MenuItemInner} {
    padding: 8px 12px;
  }
`;

export type SubmenuProps = {
  className?: string;
  id: React.Key;
  title?: React.ReactNode;
  icon?: React.ReactNode;
};

const Submenu: React.FC<PropsWithChildren<SubmenuProps>> = ({ className, id, icon, children, title }) => {
  const activeKeys = useContext(ActiveKeysContext);

  const isActive = useMemo(() => {
    return activeKeys.ids.includes(id);
  }, [id, activeKeys]);

  const root: ActiveKeys = useMemo(() => {
    return {
      ids: activeKeys.ids,
      depth: activeKeys.depth + 1,
    };
  }, [activeKeys]);

  const depth = root.depth * 18 - 1;
  if (!isActive) {
    return (
      <MenuItem className={className} id={id} icon={icon}>
        {title}
      </MenuItem>
    );
  }

  return (
    <ActiveKeysContext.Provider value={root}>
      <li className={cx(BaseMenuItem, className)}>
        <span className={cx(MenuItemInner, SubmenuActiveItem, SubmenuTitle)}>
          {icon}
          <span>{title}</span>
        </span>
        {children && (
          <ul className={BasicSubmenu} style={{ marginLeft: depth }}>
            {children}
          </ul>
        )}
      </li>
    </ActiveKeysContext.Provider>
  );
};

export default memo(Menu);

const MenuItemMemo = memo(MenuItem);
const SubmenuMemo = memo(Submenu);

export { MenuItemMemo as MenuItem, SubmenuMemo as Submenu };
