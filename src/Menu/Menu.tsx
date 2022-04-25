import { css, cx } from "@linaria/core";
import { createContext, memo, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import "../global";

const KeyRegistryContext = createContext<ReturnType<typeof useKeyRegistry>>(null as any);

function useKeyRegistry() {
  const keys2path = useRef(new Map<string, string>());
  const paths2key = useRef(new Map<string, string>());
  const register = useCallback((key: string, path: string) => {
    keys2path.current.set(key, path);
    paths2key.current.set(path, key);
  }, []);

  const unregister = useCallback((key: string, path: string) => {
    keys2path.current.delete(key);
    paths2key.current.delete(path);
  }, []);

  const getKeys = useCallback(() => {
    return [...keys2path.current.keys()];
  }, []);

  const getSubPathKeys = useCallback((key: string) => {
    const path = `${keys2path.current.get(key)}/`;

    const keyPaths = new Set<string>();

    [...paths2key.current.entries()].forEach(([k, v]) => {
      if (k.startsWith(path!)) {
        keyPaths.add(v);
      }
    });
    return keyPaths;
  }, []);

  const getKeyPath = useCallback((key: string) => {
    return keys2path.current.get(key)!;
  }, []);

  return {
    register,
    unregister,
    getKeys,
    getSubPathKeys,
    getKeyPath,
  };
}

interface ActiveKeys {
  ids: string[];
  depth: number;
  onChange: (e: string) => void;
  parents: string[];
}

const ActiveKeysContext = createContext<ActiveKeys>(null as any);

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

function getParentKeyFromPath(path: string): string | undefined {
  const paths = path.split("/");
  paths.pop();
  return paths.pop();
}

export type MenuProps = {
  className?: string;
  activeKeys?: string[];
  onChange?: (e: string[]) => void;
};

const Menu: React.FC<PropsWithChildren<MenuProps>> = ({ className, activeKeys, children, onChange }) => {
  const keyRegistry = useKeyRegistry();
  const rootValue: ActiveKeys = useMemo(() => {
    return {
      ids: activeKeys ?? [],
      depth: 0,
      parents: [],
      onChange: (id: string) => {
        if (activeKeys?.includes(id)) {
          return;
        }

        const path = keyRegistry.getKeyPath(id);
        const parent = getParentKeyFromPath(path);
        if (!parent) {
          onChange?.([id]);
        } else {
          const keys = keyRegistry.getSubPathKeys(parent);
          const shouldAddBack = !activeKeys?.includes(id);
          const ids = (activeKeys ?? []).filter((a) => !keys.has(a));
          if (shouldAddBack) {
            ids.push(id);
          }

          onChange?.(ids);
        }
      },
    };
  }, [activeKeys, onChange]);
  return (
    <ActiveKeysContext.Provider value={rootValue}>
      <KeyRegistryContext.Provider value={keyRegistry}>
        <InternalMenu className={className}>{children}</InternalMenu>
      </KeyRegistryContext.Provider>
    </ActiveKeysContext.Provider>
  );
};

const BasicMenuItemActive = css``;

const BaseMenuItem = css`
  cursor: pointer;
  display: block;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  position: relative;

  & .${BasicMenuItemActive} {
    font-weight: 500;
  }
`;

const BasicMenuItem = css`
  padding: 4px 4px;
`;

const MenuItemInner = css`
  display: flex;
  flex: 1;
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
  border-radius: 4px;
  .${BasicMenuItem}:hover & {
    background-color: var(--gray-2);
  }

  .${BasicMenuItem} &.${BasicMenuItemActive} {
    background-color: var(--gray-3);
  }
`;

export type MenuItemProps = {
  className?: string;
  id?: string;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};
const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = ({ className, id, icon, children, onClick: _onClick }) => {
  const activeKeys = useContext(ActiveKeysContext);
  const keyRegistry = useContext(KeyRegistryContext);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (id) {
      const path = "/" + [...activeKeys.parents, id].join("/");
      keyRegistry.register(id, path);
      return () => {
        keyRegistry.unregister(id, path);
      };
    }
  }, [id]);

  const isActive = useMemo(() => {
    return id ? activeKeys.ids.includes(id) : false;
  }, [id, activeKeys]);
  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (id) {
        activeKeys.onChange(id);
      }

      _onClick?.(e);
    },
    [_onClick, activeKeys.ids, activeKeys.onChange, id, keyRegistry]
  );
  return (
    <li className={cx(BaseMenuItem, BasicMenuItem, className)} onClick={onClick}>
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
  font-weight: 500;
`;

const SubmenuTitle = css`
  border-radius: 4px;
  &:not(.${SubmenuActiveItem}):hover {
    background-color: var(--gray-2);
  }
`;

const SubmenuInnerMenuHidden = css`
  display: none;
`;

type SubmenuInnerMenuProps = {
  active?: boolean;
};

const ANIMATION_DURATION = 500;

function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

function clamp(input: number, min: number, max: number): number {
  return Math.min(Math.max(input, min), max);
}

/**
 * This component is used to implement the collapsible effect within the submenu
 */

const SubmenuInnerMenu: React.FC<PropsWithChildren<SubmenuInnerMenuProps>> = ({ children, active }) => {
  const activeKeys = useContext(ActiveKeysContext);
  const depth = activeKeys.depth * 18 - 1;
  /// We don't actually want to animate on the first render.
  const isMounted = useRef(false);
  /// The reference to the actual node that we will be animating.
  const ref = useRef<HTMLUListElement>(null);
  /// The time that we started an animation, used to calcate the animation duration.
  const animationStartTime = useRef<number | null>(null);
  useEffect(() => {
    /// Regardless of what animation we are doing, the need to set the current start timestamp.
    animationStartTime.current = Date.now();
    /// If this is the first render we skip any animation.
    if (!isMounted.current) {
      return () => {};
    }

    /// This is the cancelation token to cancel any animation that is occuring,
    /// in the event that another animation is triggered.
    let cancel: number;

    function animateCore(fn: (progress: number) => void, done: () => void) {
      /// Next we calculate the progress of the animation from 0 to 1,
      /// using the current time and the time the animation started.
      const absoluteProgress = clamp((Date.now() - animationStartTime.current!) / ANIMATION_DURATION, 0, 1);
      /// Using that progress we throw it into an easing function to smooth things out.
      const currentProgress = easeOutQuint(absoluteProgress);
      /// Using this new eased progress we can get the real height of the submenu.
      fn(currentProgress);
      if (currentProgress !== 1) {
        cancel = requestAnimationFrame(() => {
          animateCore(fn, done);
        });
      } else {
        done();
      }
    }

    if (active) {
      if (ref.current) {
        /// Start off the reveal animation by setting our initial height to 0
        /// and clearing the hidden class if it's there.
        ref.current.style.height = "0px";
        ref.current!.classList.remove(SubmenuInnerMenuHidden);

        animateCore(
          (progress) => {
            /// We get the current target height that we want to animate to,
            /// using scrollHeight to get the actual height with overflow caclulated.
            const targetHeight = ref.current!.scrollHeight;
            /// Using this new eased progress we can get the real height of the submenu.
            const realHeight = targetHeight * progress;
            ref.current!.style.height = `${realHeight}px`;
          },
          () => {
            ref.current!.style.height = "";
          }
        );
      }
    } else {
      if (ref.current) {
        /// start our animation by manually setting height to the actual height.
        ref.current.style.height = `${ref.current.scrollHeight}px`;
        animateCore(
          (progress) => {
            /// We get the current target height that we want to animate to,
            /// using scrollHeight to get the actual height with overflow caclulated.
            const targetHeight = ref.current!.scrollHeight;
            /// Using that progress we throw it into an easing function to smooth things out.
            /// We also invert to the get the inverse progress.
            const currentProgress = 1 - progress;
            /// Using this new eased progress we can get the real height of the submenu.
            const realHeight = targetHeight * currentProgress;
            ref.current!.style.height = `${realHeight}px`;
          },
          () => {
            ref.current!.style.height = "";
            ref.current!.classList.add(SubmenuInnerMenuHidden);
          }
        );
      }
    }

    return () => {
      /// When there is a transition between states,
      /// if there is any animation currently running
      /// we cancel it.
      if (cancel) {
        cancelAnimationFrame(cancel);
      }

      if (ref.current) {
        /// Reset the height of the node
        ref.current.style.height = "";

        /// And if we weren't active, we add the hidden class back in.
        if (!active) {
          ref.current.classList.add(SubmenuInnerMenuHidden);
        }
      }
    };
  }, [active]);

  useEffect(() => {
    requestAnimationFrame(() => {
      isMounted.current = true;
    });
  }, []);
  return (
    <ul ref={ref} className={cx(BasicSubmenu)} style={{ marginLeft: depth }}>
      {children}
    </ul>
  );
};

export type SubmenuProps = {
  className?: string;
  id: string;
  title?: React.ReactNode;
  icon?: React.ReactNode;
};

const Submenu: React.FC<PropsWithChildren<SubmenuProps>> = ({ className, id, icon, children, title }) => {
  const activeKeys = useContext(ActiveKeysContext);
  const keyRegistry = useContext(KeyRegistryContext);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (id) {
      const path = "/" + [...activeKeys.parents, id].join("/");
      keyRegistry.register(id, path);
      return () => {
        keyRegistry.unregister(id, path);
      };
    }
  }, [id]);

  const isActive = useMemo(() => {
    return activeKeys.ids.includes(id);
  }, [id, activeKeys]);

  const root: ActiveKeys = useMemo(() => {
    return {
      ids: activeKeys.ids,
      depth: activeKeys.depth + 1,
      parents: [...activeKeys.parents, id],
      onChange: activeKeys.onChange,
    };
  }, [activeKeys, id]);

  const onClick = useCallback(() => {
    root.onChange(id);
  }, [id, root.onChange]);

  return (
    <ActiveKeysContext.Provider value={root}>
      <li
        className={cx(
          BaseMenuItem,
          css`
            background-color: var(--gray-1);
          `,
          className
        )}>
        <span
          className={css`
            display: flex;
            padding: 4px 4px;
            background-color: #fff;
          `}>
          <span className={cx(MenuItemInner, isActive && SubmenuActiveItem, SubmenuTitle)} onClick={onClick}>
            {icon}
            <span>{title}</span>
          </span>
        </span>
        <SubmenuInnerMenu active={isActive}>{children}</SubmenuInnerMenu>
      </li>
    </ActiveKeysContext.Provider>
  );
};

export default memo(Menu);

const MenuItemMemo = memo(MenuItem);
const SubmenuMemo = memo(Submenu);

export { MenuItemMemo as MenuItem, SubmenuMemo as Submenu };
