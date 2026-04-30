"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "홈" },
  { href: "/todos", label: "Todo 목록" },
  { href: "/todos/new", label: "+ 추가" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* 브랜드 */}
        <Link
          href="/"
          className="text-base font-bold text-gray-900 no-underline"
        >
          Todo App
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors no-underline
                ${
                  pathname === href
                    ? "bg-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
