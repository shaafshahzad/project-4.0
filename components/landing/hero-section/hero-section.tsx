import React from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/sign-in-or-create";
import { motion } from "framer-motion";

const HeroSection = () => {
    const router = useRouter();
    const handleSignIn = async () => {
        await signIn(router);
    };

    return (
        <motion.div 
            className="flex items-center flex-col w-full text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        > 
            <motion.h1 
                className="text-6xl font-medium px-20 text-center mt-52 max-w-[1000px]"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                Stay on top of your courses and deadlines with ease
            </motion.h1>
            <motion.p 
                className="text-xl font-thin mt-10 max-w-[800px]"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                Project 4.0 is a centralized academic hub that blends effortlessly into <br /> your study routine, streamlining your tasks so you can focus <br /> on what really matters - getting that well-deserved A
            </motion.p>
            <motion.div 
                className="flex flex-row gap-4 mt-20"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <Button onClick={handleSignIn} className="w-36">Log In</Button>
                <Button variant="outline" onClick={handleSignIn} className="w-36">Sign Up</Button>
            </motion.div>
        </motion.div>
    );
}

export default HeroSection;