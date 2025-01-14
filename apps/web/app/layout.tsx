import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "tip.dev",
    description: "tip.dev"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`min-h-screen overflow-auto bg-background font-sans antialiased ${geistSans.variable}`}
            >
                {children}
            </body>
        </html>
    );
}
