"use client";

import React from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import Link from "next/link";

const NavbarLanding = () => {
    const navbarItems = ["Home", "About", "Contact", "Blog"];

    return (
        <div className="flex items-center pb-6 justify-center">
            <NavigationMenu className="flex justify-end">
                <NavigationMenuList className="gap-x-6 text-xs">
                    {navbarItems.map((item, index) => (
                        <NavigationMenuItem key={index} className="">
                            <Link
                                href={`/${item.toLowerCase()}`}
                                legacyBehavior
                                passHref
                            >
                                <NavigationMenuLink
                                    style={{
                                        paddingLeft: "10px",
                                        paddingRight: "10px",
                                        paddingTop: "5px",
                                        paddingBottom: "5px",
                                    }}
                                    className={`bg-transparent hover:bg-zinc-200 dark:hover:bg-foreground/20 hover:text-foreground ${navigationMenuTriggerStyle()}`}
                                >
                                    {item}
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
};

export default NavbarLanding;
