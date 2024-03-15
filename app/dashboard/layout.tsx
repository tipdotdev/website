"use client";
import DashboardLayout from "@/components/dashboard-layout";
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

    return <DashboardLayout>{children}</DashboardLayout>;
}