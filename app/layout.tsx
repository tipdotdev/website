import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { Nunito as FontSerif } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans"
});

const fontSerif = FontSerif({
    subsets: ["latin"],
    variable: "--font-serif"
});

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#fe7ac6" },
        { media: "(prefers-color-scheme: dark)", color: "#fe7ac6" }
    ]
};

export const metadata: Metadata = {
    title: "tip.dev coming soon",
    description:
        "A platform for developers to get tipped from fans of their work. Embed a link anywhere, and get paid from almost everywhere. Coming soon.",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://tip.dev",
        title: "tip.dev coming soon",
        description:
            "A platform for developers to get tipped from fans of their work. Embed a link anywhere, and get paid from almost everywhere. Coming soon.",
        images: [
            {
                url: "https://tip.dev/images/png/og-image.png",
                width: 1200,
                height: 630,
                alt: "tip.dev coming soon"
            }
        ]
    },
    robots: "noindex, nofollow",
    referrer: "no-referrer-when-downgrade",
    keywords:
        "tip.dev, coming soon, tip, dev, tipdev, tip.dev coming soon, tip.dev, devs, developers, ko-fi, buymeacoffee, link in bio, money, freelance"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                    fontSerif.variable
                )}
            >
                <TooltipProvider>
                    {children}
                    <Toaster richColors />
                </TooltipProvider>
            </body>
        </html>
    );
}
