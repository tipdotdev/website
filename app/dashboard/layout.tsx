"use client";
import DashboardNavbar from "@/components/dashboard-navbar";
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

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            <DashboardNavbar />
            {children}
        </main>
    );
}
