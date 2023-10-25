import { Inter } from "next/font/google";
import DashboardTopNav from "@/comps/dashboardNavbar";
import DashboardSidebar from "@/comps/dashboardSidebar";
import SEOHead from "@/comps/seohead";
import { useEffect, useState } from "react";
import DashboardFooter from "@/comps/dashboardFooter";
import DashboardAccount from "@/comps/dashboardAccount";
import useUser from "@/hooks/useUser";

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
    const { token, isAuthLoading, isSignedIn, user, logout } = useUser()

    useEffect(() => {
        if (!isSignedIn && !isAuthLoading) {
            window.location.href = "/signin"
        }
    }, [isSignedIn])

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">

            <SEOHead title="{$} | Account" />
                    
            <DashboardTopNav
                user={user}
                logout={logout}
                isAuthLoading={isAuthLoading}
                isSignedIn={isSignedIn}
            />

            <DashboardSidebar 
                content={ <DashboardAccount user={user} token={token} logout={logout} isAuthLoading={isAuthLoading} /> }
                user={ user }
            />
            
            <DashboardFooter />

        </main>
    )
}