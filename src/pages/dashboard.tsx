import { Inter } from "next/font/google";
import useUser from "@/hooks/useUser"
import DashboardTopNav from "@/comps/dashboardNavbar";
import DashboardSidebar from "@/comps/dashboardSidebar";
import SEOHead from "@/comps/seohead";
import DashboardHome from "@/comps/dashboardHome";
import { useEffect } from "react";
import DashboardFooter from "@/comps/dashboardFooter";

const inter = Inter({ subsets: ['latin'] })

export default function Page() {

    const { token, isAuthLoading, isSignedIn, user, logout } = useUser()


    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">

            <SEOHead title="{$} | Dashboard" />
                    
            <DashboardTopNav
                user={user}
                logout={logout}
                isAuthLoading={isAuthLoading}
                isSignedIn={isSignedIn}
            />

            <DashboardSidebar 
                content={ <DashboardHome user={user} token={token} isAuthLoading={isAuthLoading} /> }
                user={ user }
            />
            
            <DashboardFooter />

        </main>
    )
}