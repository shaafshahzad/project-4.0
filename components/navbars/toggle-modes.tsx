"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import useScreenSize from "@/lib/hooks/use-screensize";

const ToggleModes = () => {
    const { theme, setTheme } = useTheme();
    const isScreenBreakpoint = useScreenSize();

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            onClick={toggleTheme}
            size="icon"
            variant="outline"
            className={`${isScreenBreakpoint ? "w-10" : "w-full"}`}
        >
            {theme === "dark" ? (
                <Sun className="h-5 w-5" />
            ) : (
                <Moon className="h-5 w-5" />
            )}
        </Button>
    );
};

export default ToggleModes;
