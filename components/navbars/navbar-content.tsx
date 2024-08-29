import React from "react";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";
import useScreenSize from "@/lib/hooks/use-screensize";

const NavbarContent = () => {
  const navbarItems = ["Dashboard", "Calendar", "Grades", "Assignments", "Exams"];
  const isScreenBreakpoint = useScreenSize();

  return (
    <NavigationMenuList
      className={`gap-x-2 text-xs flex ${
        isScreenBreakpoint ? "flex-row justify-start" : "flex-col"
      }`}
    >
      {navbarItems.map((item, index) => (
        <NavigationMenuItem key={index} className="">
          <Link href={`/${item.toLowerCase()}`} legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-transparent hover:bg-zinc-200 dark:hover:bg-foreground/20 hover:text-foreground ${navigationMenuTriggerStyle()}`}
            >
              {item}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  );
};

export default NavbarContent;
