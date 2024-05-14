"use client";

import useAuthStore from "@/stores/auth-store";
import useDashboardStore from "@/stores/dashboard-store";
import { useEffect } from "react";

export default function Page() {
    const { user } = useAuthStore();
    const { setActiveTab } = useDashboardStore();

    useEffect(() => {
        setActiveTab("history");
    }, []);

    return <></>;
}
