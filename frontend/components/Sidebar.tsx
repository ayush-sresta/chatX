"use client";

import { IconBrandTelegram, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Messages",
      href: "/inbox",
      icon: IconBrandTelegram,
    },
    {
      label: "Search",
      href: "/search",
      icon: IconSearch,
    },
  ];

  return (
    <aside
      className={`h-screen sticky top-0
        transition-all duration-100 ease-in-out w-14 group hover:w-60
      `}
    >
      <div className={`h-full flex flex-col p-2`}>
        {/* Header */}
        <div className={`flex items-center mb-24`}>
          {/* <h1 className="text-xl font-bold text-primary">Admin</h1> */}
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg p-2 font-medium transition
    ${isActive ? "bg-muted" : "hover:bg-muted"}
  `}
                  >
                    <Icon
                      className="shrink-0"
                      size={26}
                      stroke={isActive ? 2.5 : 1.5}
                    />

                    <span
                      className="overflow-hidden
      whitespace-nowrap
      opacity-0
      w-0
      transition-all
      duration-200
      group-hover:opacity-100
      group-hover:w-auto
    "
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
