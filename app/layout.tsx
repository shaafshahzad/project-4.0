import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import NavbarLanding from "@/components/navbars/navbar-landing";
import NavbarMain from "@/components/navbars/navbar-main";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const fontMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata: Metadata = {
    title: "Project 4.0",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "font-sans flex flex-col h-screen",
                    fontSans.variable,
                    fontMono.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NavbarLanding />
                    <NavbarMain />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
