"use client";

import NavbarLanding from "@/components/navbars/navbar-landing";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/sign-in-or-create";
import React from "react";

const Landing = () => {
    const router = useRouter();
    const handleSignIn = async () => {
        await signIn(router);
    };

    return (
        <div>
            <NavbarLanding />
            <Button onClick={handleSignIn}>log in or sign up</Button>
        </div>
    );
};

export default Landing;
