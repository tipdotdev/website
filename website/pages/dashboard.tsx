import { Inter } from "next/font/google";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import DashboardTopNav from "@/comps/dashboardNavbar";
import DashboardSidebar from "@/comps/dashboardSidebar";
import SEOHead from "@/comps/seohead";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function page() {
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

    const [ greeting, setGreeting ] = useState("")
    const greetingList = ["Hey", "Yo", "Welcome", "What's Up", "Hi", "Hello", "Howdy", "Greetings"]

    const randomGreeting = () => {
        const random = Math.floor(Math.random() * greetingList.length)
        setGreeting(greetingList[random])
    }

    useEffect(() => {
        randomGreeting()
    }, [])

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">

            <SEOHead title="Dashboard" />
            
            <DashboardTopNav />

            <DashboardSidebar content={
                <div className="flex flex-col w-full">
                    <div className="text-center flex-col p-5 bg-base-200 w-full rounded-xl items-center">
                        <div className="flex flex-row justify-start items-center mx-auto">
                            <img src={user?.imageUrl} className="rounded-full w-20" />
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold ml-5">{greeting}, <span className="text-primary">{user?.username}</span></h1>
                                <a href={`https://tip.dev/${user?.username}`} className="text-md ml-5 mt-1 font-code link link-hover">tip.dev/{user?.username}</a>
                            </div>
                        </div>

                        <div className="divider"></div> 

                        <div className="flex flex-row justify-between">

                            <div className="flex flex-row justify-center items-center">
                                <h1 className="text-2xl font-bold">8127</h1>
                                <h1 className="text-md font-code">Tips</h1>
                            </div>
                            
                        </div>
                    </div>
                </div>

            } />

        </main>
    )
}