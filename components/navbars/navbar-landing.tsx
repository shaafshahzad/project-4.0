"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/sign-in-or-create";
import { Button } from "../ui/button";
import ToggleModes from "./toggle-modes";

const NavbarLanding = () => {
    const navbarItems = ["Features", "FAQ", "Contact", "Log In", "Sign Up"];
    const pathname = usePathname();
    const router = useRouter();

    if (pathname !== "/") {
        return null;
    }

    const handleSignIn = async () => {
        await signIn(router);
    };


    return (
        <div className="flex items-center justify-between w-full py-2 px-96 bg-background/20 backdrop-blur-sm border-b border-border/50 fixed top-0 z-50">
            <h1 className="italic font-semibold text-2xl">p4.0</h1>
            <div className="flex items-center space-x-4 space-x-8">
                {navbarItems.map((item, index) => (
                    <React.Fragment key={index}>
                        {item === "Sign Up" ? (
                            <Button variant="outline" onClick={handleSignIn} className="text-xs text-foreground/90 hover:text-foreground">
                                {item}
                            </Button>
                        ) : item === "Log In" ? (
                            <Link
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSignIn();
                                }}
                                className="text-xs hover:underline text-foreground/90 hover:text-foreground"
                            >
                                {item}
                            </Link>
                        ) : (
                            <Link
                                href={`#${item.toLowerCase()}`}
                                className="text-xs hover:underline text-foreground/90 hover:text-foreground"
                            >
                                {item}
                            </Link>
                        )}
                    </React.Fragment>
                ))}
                <ToggleModes />
            </div>
        </div>
    );
};

export default NavbarLanding;
