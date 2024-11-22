import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@material-tailwind/react";

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
        <html lang="en">
          <body className={inter.className}>
          {children}
          </body>
        </html>
      // </ThemeProvider>
  );
}
