"use client";
import { DashboardRootLayout } from "@/components/dashboard/dashboard-layout";
import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isSignedIn } = useAuthStore.getState();
    const router = useRouter();

    useEffect(() => {
        if (!isSignedIn) {
            router.push("/auth/signin");
        }
    }, [isSignedIn, router]);

    return <DashboardRootLayout>{children}</DashboardRootLayout>;
}
