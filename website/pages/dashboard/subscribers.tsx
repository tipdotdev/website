import { Inter } from "next/font/google";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import DashboardTopNav from "@/comps/dashboardNavbar";
import DashboardSidebar from "@/comps/dashboardSidebar";
import SEOHead from "@/comps/seohead";
import { useEffect, useState } from "react";
import DashboardFooter from "@/comps/dashboardFooter";
import DashboardSubs from "@/comps/dashboardSubscribers";

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isSignedIn) {
        <RedirectToSignIn />
    }

    if (!isLoaded) {
        return (
            <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
                <span className="loading loading-spinner"></span>
            </main>
        )
    }

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">

            <SEOHead title="{$} | Dashboard Subs" />
            
            <DashboardTopNav />

            {/* <DashboardFooter /> */}

            <DashboardSidebar 
                content={ <DashboardSubs user={user} /> }
                user={ user }
            />

        </main>
    )
}