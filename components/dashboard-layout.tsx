"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import useAuthStore from "@/stores/auth-store";
import UserDropdown from "./user-dropdown";
import DashboardTopNav from "./dashboard-top-nav";
import DashboardSidebar from "./dashboard-sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            <DashboardTopNav />
            <DashboardSidebar />
            {children}
        </main>
    );
}
