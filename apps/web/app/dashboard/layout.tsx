"use client";
import { DashboardRootLayout } from "@/components/dashboard/dashboard-layout";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn && isLoaded) {
            router.push("/sign-in");
        }
    }, [isSignedIn, router, isLoaded]);

    return <DashboardRootLayout>{children}</DashboardRootLayout>;
}
