"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { link } from "fs";
import { text } from "stream/consumers";

const Links = [
  { name: "Dashboard", link: "/" },
  { name: "Issues", link: "/issues" },
];

const Navbar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <nav className="flex space-x-5 border-b-2 h-14 pl-10 items-center">
      <div>
        <Link href="/">
          <FaBug className="text-xl" />
        </Link>
      </div>
      <ul className="flex space-x-5 ">
        {Links.map((item) => (
          <li
            key={item.name}
            className={classNames({
              "text-zinc-900 font-bold": item.link === currentPath,
              "text-zinc-500": item.link !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
