import React from "react";
import { CalendarIcon, BrainCircuitIcon, CalculatorIcon, NotebookPenIcon } from "lucide-react";
import FeatureBlock from "./feature-block";
import { motion } from "framer-motion";

const Feature = () => {
    const features = [
        {
            title: "Smart Course Upload",
            description: "Upload your course outlines, and let AI extract all the key details you need.",
            icon: <BrainCircuitIcon />
        },
        {
            title: "Dynamic Calendar",
            description: "View your entire schedule and easily add tasks or events, keeping your semester on track.",
            icon: <CalendarIcon />
        },
        {
            title: "In-depth Grade Calculator",
            description: "Calculate your grades with precision using predefined values from your courses.",
            icon: <CalculatorIcon />
        },
        {
            title: "Assignment Tracker",
            description: "Keep all your assignments in one place, track progress, and never miss a deadline again.",
            icon: <NotebookPenIcon />
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 w-full px-4 md:px-8 lg:px-16">
            {features.map((feature, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-center"
                >
                    <FeatureBlock title={feature.title} description={feature.description} icon={feature.icon} />
                </motion.div>
            ))}
        </div>
    );
}

export default Feature;