"use client";

import React, { useEffect } from "react";
import { userSignOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { auth } from "@/lib/firebase";
import { LogOut } from "lucide-react";
import useScreenSize from "@/lib/hooks/use-screensize";
import { useAuth } from "@/lib/hooks/use-auth";

const UserIcon = () => {
    const [photoURL, setPhotoURL] = React.useState<string | null>("");
    const router = useRouter();
    const isScreenBreakpoint = useScreenSize();
    const userData = useAuth(router);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.photoURL) {
                setPhotoURL(user.photoURL);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        try {
            await userSignOut();
            router.push("/");
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div
                    className={`flex items-center ${
                        isScreenBreakpoint ? "" : "w-full"
                    }`}
                >
                    <Avatar className="align-right w-9 h-9 cursor-pointer border">
                        {photoURL ? (
                            <AvatarImage src={photoURL} />
                        ) : (
                            <AvatarFallback>{"?"}</AvatarFallback>
                        )}
                    </Avatar>
                    {isScreenBreakpoint ? null : (
                        <p className="text-sm w-full max-w-lg px-2">
                            {userData?.name}
                        </p>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserIcon;
