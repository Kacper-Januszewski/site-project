import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@material-tailwind/react";

// ⬇️ Added import for dark mode handling
import { ThemeProvider as NextThemesProvider } from "next-themes";

// ⬇️ Import the scrolling background canvas
import BackgroundCanvas from "./components/BackgroundCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kacper Januszewski Portfolio",
    description: "This is a developer portfolio website",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        //this throws an error
        // <ThemeProvider>
        <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
        {/* ⬇️ BackgroundCanvas sits behind everything */}
        <BackgroundCanvas />

        {/* ⬇️ NextThemesProvider so dark mode works */}
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {children}
        </NextThemesProvider>
        </body>
        </html>
        // </ThemeProvider>
    );
}
