"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const itemClass = (href: string) =>
    `mx-2 rounded-md transition-colors ${
      pathname === href ? "bg-white/40 shadow-sm" : "hover:bg-white/25"
    }`;

  return (
    <div className="sidebar h-auto w-full shrink-0 md:w-[220px]">
      <div className="sidebar__container h-[100%] w-[100%]">
        <div className="sidebar__text py-3 text-center text-[25px] font-bold">
          Menu
        </div>

        <ul className="sidebar__list flex flex-row flex-wrap font-bold md:flex-col">
          <li className={itemClass("/")}>
            <Link
              href="/"
              className="block px-8 py-2.5"
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Dashboard
            </Link>
          </li>
          <li className={itemClass("/search-scores")}>
            <Link
              href="/search-scores"
              className="block px-8 py-2.5"
              aria-current={pathname === "/search-scores" ? "page" : undefined}
            >
              Search Scores
            </Link>
          </li>
          <li className={itemClass("/reports")}>
            <Link
              href="/reports"
              className="block px-8 py-2.5"
              aria-current={pathname === "/reports" ? "page" : undefined}
            >
              Reports
            </Link>
          </li>
          <li className={itemClass("/settings")}>
            <Link
              href="/settings"
              className="block px-8 py-2.5"
              aria-current={pathname === "/settings" ? "page" : undefined}
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
