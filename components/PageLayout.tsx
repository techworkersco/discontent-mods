import Link from "next/link";
import { StaticPage, MenuItem } from "../data/types";
import useSWR from "swr";
import { doNotFetch } from "../utils/swr";
import cx from "classnames";
import useScrollPosition from "@react-hook/window-scroll";
import { useRef, useState } from "react";
import { useEffect } from "react";

export default function PageLayout({ children }: { children: any }) {
  return (
    <div className='min-h-screen flex flex-col relative text-black dark:bg-black dark:text-white'>
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  );
}

function ThemeToggle({ }: { systemDark: boolean, theme: string }) {

}

function Header({}: {}) {
  const { data } = useSWR<{ headerLinks: MenuItem[] }>(
    "/api/links?placement=Header",
    {
      // Data should have been loaded by _app.tsx already,
      ...doNotFetch(),
    }
  );

  const [theme, setThemeState] = useState<string | null>(null);
  const [systemDark, setSystemDark] = useState<boolean>(true);

  const headerRef = useRef<HTMLDivElement>(null);
  const scrollY = useScrollPosition(60 /*fps*/);
  const isFloating = scrollY > (headerRef.current?.clientHeight || 100) * 0.75;
  useEffect(() => {
    setSystemDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  const ThemeSelect = () => (            <select
    className='bg-white dark:bg-black p-2'
    onChange={e => {
      const value = e.target?.value;
      let darkMode =
        window.localStorage.getItem("theme") === "dark";

      if (value === "system") {
        setThemeState(null);
        window.localStorage.removeItem("theme");
        darkMode = window.matchMedia("(prefers-color-scheme: dark)")
          .matches;
        setSystemDark(darkMode);
      } else if (value) {
        setThemeState(value);
        window.localStorage.setItem("theme", value);
        darkMode = value === "dark";
      }
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }}
  >
    <option
      className='dark:bg-black'
      selected={!theme}
      value='system'
      label={(systemDark ? "🌒" : "☀️") + " System"}
    />
    <option
      className='dark:bg-black'
      selected={theme === "dark"}
      value='dark'
      label={"🌒 Dark Mode"}
    />
    <option
      className='dark:bg-black'
      selected={theme === "light"}
      value='light'
      label={"☀️ Light Mode"}
    />
  </select>)

  return (
    <>
      <header className='py-5 space-y-2' ref={headerRef} id='static-header'>
        <div className='content-wrapper'>
          <div className='sm:flex sm:space-x-4 space-y-2 sm:space-y-0 items-top'>
            <div className='leading-none text-4xl lg:text-[4vw] font-identity cursor-pointer dark:text-white hover:text-black flex-shrink-0'>
              <Link href='/'>
                <>
                  <span className='text-gwRed'>Dis</span>content Moderators
                </>
              </Link>
            </div>
            <p className='leading-normal sm:leading-tight text-xl xl:text-2xl md:w-1/2 block text-200 max-w-2xl font-light flex-shrink-0'>
              Mapping and documenting collective movements by platform content
              moderation workers striving to improve their working conditions.
            </p>
            <div>
                <ThemeSelect />
            </div>
          </div>
        </div>
      </header>
      <nav
        className={`top-0 sticky z-40 py-3 ${
          isFloating && "bg-white dark:bg-black dark:bg-dark"
        }`}
        id='sticky-header'
      >
        <div className='text-sm md:text-base content-wrapper w-full flex flex-row flex-wrap align-items-stretch justify-start -mx-1 space-x-1 md:-mx-2 md:space-x-3 '>
          {isFloating && (
            <Link href='/'>
              <span className='text-gwRed font-identity leading-none text-4xl order-first' style={{ minWidth: 20 }}>
                D
              </span>
            </Link>
          )}
          {data?.headerLinks?.map?.((link, i) => (
            <a
              href={link.fields.url}
              key={link.fields.url}
              className='order-end flex'
            >
              <span className='nav-link'>{link.fields.label}</span>
            </a>
          ))}
  
          <div
            className={cx(
              isFloating
                ? "opacity-100 max-w-6xl translate-x-0 bg-white dark:bg-black"
                : "opacity-0 translate-x-2",
              "hidden md:block transform ml-auto duration-200 transition-all leading-none text-xl lg:text-2xl font-identity cursor-pointer hover:text-blackLight flex flex-shrink-0 order-1 md:order-last"
            )}
            style={{ marginLeft: "auto" }}
          >
            <Link href='/'>Discontent Moderators</Link>
          </div>
          <div className="order-end flex">
          {isFloating && (
                            <ThemeSelect />

          )}
          </div>
        </div>
      </nav>
      <div id='portal-node' />
    </>
  );
}

function Footer({}: {}) {
  const { data } = useSWR<{ footerLinks: MenuItem[] }>(
    "/api/links?placement=Header",
    {
      // Data should have been loaded by _app.tsx already,
      ...doNotFetch(),
    }
  );

  return (
    <footer className='mt-auto bg-dark dark:bg-light text-sm text-bg text-white'>
      <div className='content-wrapper py-5 md:py-6 space-y-4 flex flex-col md:flex-row justify-between items-start align-top'>
        <div className='space-y-4 flex-grow'>
          <nav className='flex flex-wrap -mx-1 md:-mx-2'>
            {data?.footerLinks?.map?.((link, i) => (
              <a
                href={link.fields.url}
                key={link.fields.url}
                className='hover:text-black dark:hover:bg-light dark:hover:text-black'
              >
                <span className='nav-link'>{link.fields.label}</span>
              </a>
            ))}
          </nav>
          <div className='md:flex space-y-4 md:space-y-0 md:space-x-5'>
            <div>
              Forked from{" "}
              <a
                className='link'
                href='https://github.com/gameworkersolidarity/website'
              >
                gameworkersolidarity.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
