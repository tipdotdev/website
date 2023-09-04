import { Inter } from "next/font/google";
import useUser from "@/hooks/useUser"
import DashboardTopNav from "@/comps/dashboardNavbar";
import DashboardSidebar from "@/comps/dashboardSidebar";
import SEOHead from "@/comps/seohead";
import DashboardHome from "@/comps/dashboardHome";
import { useEffect } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Page() {

    const { token, isAuthLoading, isSignedIn, user } = useUser()

    // useEffect(() => {
    //     if (isSignedIn == false && user == null) {
    //         window.location.href = "/signin"
    //     }
    // }, [isSignedIn])


    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">

            {isAuthLoading || !user ? (
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <span className="loading loading-spinner loading-md"></span>
                </div>
            ) :
                <>

                    <SEOHead title="{$} | Dashboard" />
                    
                    <DashboardTopNav />

                    <DashboardSidebar 
                        content={ <DashboardHome user={user} token={token} /> }
                        user={ user }
                    />
                </>
            }

        </main>
    )
}