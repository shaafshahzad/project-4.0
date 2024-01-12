"use client";

import React from "react";
import { NavigationMenu } from "../ui/navigation-menu";
import { usePathname } from "next/navigation";
import UserIcon from "./user-icon";
import ToggleModes from "./toggle-modes";
import useScreenSize from "@/lib/hooks/use-screensize";
import NavbarMobile from "./navbar-mobile";
import NavbarContent from "./navbar-content";

const NavbarMain = () => {
    const pathname = usePathname();
    const isScreenBreakpoint = useScreenSize();

    if (pathname === "/") {
        return null;
    }

    return (
        <>
            <NavigationMenu className="flex justify-between w-full max-w-full px-11 py-4 border-b gap-11">
                <h1 className="italic font-semibold text-3xl">p4.0</h1>
                {isScreenBreakpoint ? (
                    <>
                        <div className="flex grow justify-start">
                            <NavbarContent />
                        </div>
                        <div className="flex items-center gap-5">
                            <ToggleModes />
                            <UserIcon />
                        </div>
                    </>
                ) : (
                    <NavbarMobile />
                )}
            </NavigationMenu>
        </>
    );
};

export default NavbarMain;
