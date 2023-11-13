import Link from "next/link";
import React from "react";

const Links = [
  { name: "Dashboard", link: "/" },
  { name: "Issues", link: "/issues" },
];

const Navbar = () => {
  return (
    <nav className="flex space-x-5 border-b-2 h-14 pl-10 items-center">
      <div>
        <Link href="/">Logo</Link>
      </div>
      <ul className="flex space-x-5 ">
        {Links.map((item) => (
          <li
            key={item.name}
            className="text-slate-700 text-lg hover:text-slate-400 transition-colors"
          >
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
