"use client";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { TooltipProvider } from "./ui/tooltip";

if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST
    });
}

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PostHogProvider client={posthog}>
            <TooltipProvider>{children}</TooltipProvider>
        </PostHogProvider>
    );
}
