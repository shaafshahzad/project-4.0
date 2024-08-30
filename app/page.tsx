"use client";

import NavbarLanding from "@/components/navbars/navbar-landing";
import React from "react";
import HeroSection from "@/components/landing/hero-section/hero-section";
import Feature from "@/components/landing/feature/feature";
import Footer from "@/components/landing/footer/footer";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

const Landing = () => {
  return (
    <>
      <AuroraBackground />
      <div className="relative z-10 flex items-center flex-col w-full min-h-screen">
        <NavbarLanding />
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 h-full flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <HeroSection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <Feature />
          </motion.div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Landing;
