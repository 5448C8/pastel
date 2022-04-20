import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Layout, Menu, MenuItem } from "../build";
import "./index.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const activeKeys = useMemo(() => {
    return [router.pathname];
  }, [router.pathname]);
  return (
    <>
      <style jsx>{`
        aside {
          height: 100vh;
          width: 200px;
          position: fixed;
          left: 0;
          top: 0;
          bottom: 0;
        }

        main {
          margin-left: 200px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        div {
          flex: 1;
          display: flex;
          flex-direction: row;
        }
      `}</style>
      <div>
        <aside>
          <Menu activeKeys={activeKeys}>
            <MenuItem id={"/button"}>
              <Link href={"/button"}>Button</Link>
            </MenuItem>
            <MenuItem id={"/checkbox"}>
              <Link href={"/checkbox"}>Checkbox</Link>
            </MenuItem>
            <MenuItem id={"/input"}>
              <Link href={"/input"}>Input</Link>
            </MenuItem>
            <MenuItem id={"/layout"}>
              <Link href={"/layout"}>Layout</Link>
            </MenuItem>
            <MenuItem id={"/menu"}>
              <Link href={"/menu"}>Menu</Link>
            </MenuItem>
            <MenuItem id={"/switch"}>
              <Link href={"/switch"}>Switch</Link>
            </MenuItem>
            <MenuItem id={"/table"}>
              <Link href={"/table"}>Table</Link>
            </MenuItem>
            <MenuItem id={"/tag"}>
              <Link href={"/tag"}>Tags</Link>
            </MenuItem>
          </Menu>
        </aside>
        <main>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </div>
    </>
  );
}
