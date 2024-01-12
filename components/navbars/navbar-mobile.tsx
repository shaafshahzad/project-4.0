import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import ToggleModes from "./toggle-modes";
import UserIcon from "./user-icon";
import NavbarContent from "./navbar-content";
import { Separator } from "../ui/separator";
import { Label } from "@radix-ui/react-dropdown-menu";

const NavbarMobile = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="border-0 bg-transparent dark:hover:bg-foreground/50"
                >
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent
                side={"left"}
                className="h-full flex flex-col justify-between"
            >
                <NavbarContent />
                <div className="flex flex-col justify-between items-start mb-5">
                    <ToggleModes />
                    <Separator className="my-3 bg-foreground/20 dark:bg-foreground/20" />
                    <UserIcon />
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default NavbarMobile;
