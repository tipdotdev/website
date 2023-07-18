import { Inter } from "next/font/google";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import DashboardTopNav from "@/comps/dashboardNavbar";
import DashboardSidebar from "@/comps/dashboardSidebar";
import SEOHead from "@/comps/seohead";
import { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import { FaICursor, FaQuestion, FaSquare } from "react-icons/fa";
import DashboardFooter from "@/comps/dashboardFooter";

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

    const [ greeting, setGreeting ] = useState("")
    const greetingList = ["Hey", "Yo", "Welcome", "What's up", "Hi", "Hello", "Howdy", "Greetings"]

    const randomGreeting = () => {
        const random = Math.floor(Math.random() * greetingList.length)
        setGreeting(greetingList[random])
    }

    useEffect(() => {
        randomGreeting()
    }, [])

    const [ timeRange, setTimeRange ] = useState("All Time")

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">

            <SEOHead title="Dashboard" />
            
            <DashboardTopNav />

            <DashboardSidebar content={
                <div className="flex flex-col w-full ml-10">
                    <div className="text-center flex-col p-5 bg-base-200 w-full rounded-xl items-center">
                        <div className="flex flex-row justify-start items-center mx-auto">
                            <img src={user?.imageUrl} className="mask mask-circle w-20" />
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold ml-5">{greeting}, <span className="text-primary">{user?.username}</span></h1>
                                <div className="tooltip tooltip-bottom" data-tip="Your page is live!">
                                    <p className="ml-5">🟢 <a href={`https://tip.dev/${user?.username}`} className="text-md mt-1 font-code link link-hover link-primary text-white">tip.dev/{user?.username}</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="divider"></div> 

                        <div className="flex flex-row justify-between gap-2">

                            <div className="flex flex-col justify-center items-start text-left bg-base-300 w-full rounded-xl p-5">

                                <div className="flex flex-row justify-between items-center w-full">
                                    
                                    <div className="flex flex-col justify-start items-start">
                                        <h1 className="text-2xl font-bold">Take Home Money</h1>
                                        <p className="text-lg text-zinc-400 font-code">After fees and such</p>
                                    </div>

                                    <select className="select select-bordered bg-base-200" onChange={
                                        (e) => {
                                            setTimeRange(e.target.value)
                                        }
                                    }>
                                        <option>All Time</option>
                                        <option>Last 30 Days</option>
                                        <option>Last 7 Days</option>
                                        <option>Last 24 Hours</option>
                                    </select>

                                </div>

                                <div className="flex flex-col justify-between w-full gap-2 mt-5">
                                    
                                    <div className="flex flex-col justify-center items-start text-left bg-base-300 rounded-xl w-fit">
                                        <h1 className="text-5xl font-bold">$136,482</h1>
                                    </div>

                                    <div className="grid grid-cols-4 grid-rows-1 items-start text-left bg-base-300 w-full rounded-xl p-5 pl-0 pb-0 font-code text-zinc-400">
                                        <div className="flex flex-row justify-start items-center">
                                            <FaSquare className="w-5 h-5 text-primary/50 mr-2" />
                                            <p className="text-lg">$125k Tips</p>
                                        </div>

                                        <div className="flex flex-row justify-start items-center">
                                            <FaSquare className="w-5 h-5 text-red-500/50 mr-2" />
                                            <p className="text-lg">$1.2k Subs</p>
                                        </div>

                                        <div className="flex flex-row justify-start items-center">
                                            <FaSquare className="w-5 h-5 text-blue-500/50 mr-2" />
                                            <p className="text-lg">$2.4k Comms</p>
                                        </div>

                                        <div className="flex flex-row justify-start items-center">
                                            <FaSquare className="w-5 h-5 text-green-500/50 mr-2" />
                                            <p className="text-lg">$3.3k Wish</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="flex flex-col justify-center items-start text-left bg-base-300 w-full rounded-xl p-5">
                                <div className="flex flex-row justify-between items-center w-full">
                                    
                                    <div className="flex flex-col justify-start items-start">
                                        <h1 className="text-2xl font-bold">Supporters</h1>
                                        <p className="text-lg text-zinc-400 font-code">Annonymous and registered users</p>
                                    </div>

                                    <select className="select select-bordered bg-base-200" onChange={
                                        (e) => {
                                            setTimeRange(e.target.value)
                                        }
                                    }>
                                        <option>All Time</option>
                                        <option>Last 30 Days</option>
                                        <option>Last 7 Days</option>
                                        <option>Last 24 Hours</option>
                                    </select>

                                </div>

                                <div className="flex flex-col justify-between w-full gap-2 mt-5">
                                    
                                    <div className="flex flex-col justify-center items-start text-left bg-base-300 rounded-xl w-fit">
                                        <h1 className="text-5xl font-bold">3,297</h1>
                                    </div>

                                    <div className="grid grid-cols-2 grid-rows-1 items-start text-left bg-base-300 w-full rounded-xl p-5 pl-0 pb-0 font-code text-zinc-400">
                                        <div className="flex flex-row justify-start items-center">
                                            <FaSquare className="w-5 h-5 text-purple-500/50 mr-2" />
                                            <p className="text-lg">2.8k Recurring</p>
                                        </div>

                                        <div className="flex flex-row justify-start items-center">
                                            <FaSquare className="w-5 h-5 text-teal-500/50 mr-2" />
                                            <p className="text-lg">1.4k One-off</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        
                    </div>
                </div>

            } />

            <DashboardFooter />

        </main>
    )
}