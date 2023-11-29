"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { FaBug } from "react-icons/fa";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Links = [
  { name: "Dashboard", link: "/" },
  { name: "Issues", link: "/issues" },
];

const Navbar = () => {
  const currentPath = usePathname();

  const { status, data: session } = useSession();

  return (
    <nav className=" border-b-2 mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Box>
              <Link href="/">
                <FaBug className="text-xl" />
              </Link>
            </Box>
            <Box>
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
            </Box>
          </Flex>
          <Box>
            {status === "loading" && <Skeleton width="3rem" />}
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="3"
                    radius="full"
                    className="cursor-pointer"
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user!.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout"> Log out </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin"> Login </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
