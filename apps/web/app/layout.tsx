import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist as FontSans, Nunito as FontSerif } from "next/font/google";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-geist-sans"
});

const fontSerif = FontSerif({
    subsets: ["latin"],
    variable: "--font-serif"
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
                className={`min-h-screen overflow-auto bg-background font-sans antialiased ${
                    (fontSans.variable, fontSerif.variable)
                }`}
            >
                {children}
            </body>
        </html>
    );
}
