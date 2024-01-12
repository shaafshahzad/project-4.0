"use client";

import React from "react";
import { Button } from "../ui/button";
import { userSignOut } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const Avatar = () => {
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await userSignOut();
            router.push("/");
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    };

    return (
        <div>
            <Button onClick={handleSignOut}>sign out here</Button>
        </div>
    );
};

export default Avatar;
