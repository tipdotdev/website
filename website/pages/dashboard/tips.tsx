import { Inter } from "next/font/google";
import useUser from "@/hooks/useUser"
import DashboardTopNav from "@/comps/dashboardNavbar";
import DashboardSidebar from "@/comps/dashboardSidebar";
import SEOHead from "@/comps/seohead";
import { useEffect, useState } from "react";
import DashboardFooter from "@/comps/dashboardFooter";
import DashboardTips from "@/comps/dashboardTips";

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
    const { token, isAuthLoading, isSignedIn, user } = useUser()

    useEffect(() => {
        if (!isSignedIn && !isAuthLoading) {
            window.location.href = "/signin"
        }
    }, [isSignedIn])

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">

            <SEOHead title="{$} | Dashboard Tips" />
            
            <DashboardTopNav />

            {/* <DashboardFooter /> */}

            {/* <DashboardSidebar 
                content={ <DashboardTips user={user} /> }
                user={ user }
            /> */}
            
            <DashboardFooter />

        </main>
    )
}