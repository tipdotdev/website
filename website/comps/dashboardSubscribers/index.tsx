import { useEffect, useState } from "react"
import { FaHeartBroken, FaSquare } from "react-icons/fa"
import IncomeEventDashboard from "../incomeEventDashboard"

export default function DashboardSubs(props:any) {

    const user = props.user

    const [ timeRange, setTimeRange ] = useState("All Time")

    const [ recentEvents, setRecentEvents ] = useState([

        {
            amount: "$10",
            type: {
                name: "New",
                color: "red"
            },
            date: "10 minutes ago",
            from: {
                username: "Someone",
                imageUrl: "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg"
            }
        },

        {
            amount: "$10",
            type: {
                name: "Consistent",
                color: "red"
            },
            date: "2 hours ago",
            from: {
                username: "Haste",
                imageUrl: "https://i.pravatar.cc/290"
            }
        },

        {
            amount: "$5",
            type: {
                name: "New",
                color: "red"
            },
            date: "4 hours ago",
            from: {
                username: "Someone",
                imageUrl: "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg"
            }
        },

        {
            amount: "$10",
            type: {
                name: "Consistent",
                color: "red"
            },
            date: "5 hours ago",
            from: {
                username: "Fab",
                imageUrl: "https://i.pravatar.cc/390"
            }
        },

        {
            amount: "$15",
            type: {
                name: "New",
                color: "red"
            },
            date: "5 hours ago",
            from: {
                username: "Someone",
                imageUrl: "https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-2.jpg"
            }
        },

    ])

    return (
        <div className="flex flex-col w-full ml-10 mb-10">
            <div className="text-center flex-col bg-base-100 w-full rounded-xl items-center">
                

                {/* <div className="divider"></div>  */}

                <div className="grid grid-cols-4 gap-2">

                    <div className="flex flex-col col-span-2 justify-center items-start text-left bg-base-200 w-full rounded-xl p-5">
                        <div className="flex flex-row justify-between items-center w-full">
                            
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold">Subscribers</h1>
                                <p className="text-lg text-zinc-400 font-code">Subs are registered users</p>
                            </div>

                            <select className="select select-bordered bg-base-300/50" onChange={
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
                            
                            <div className="flex flex-col justify-center items-start text-left bg-base-200 rounded-xl w-fit">
                                <h1 className="text-5xl font-bold">248</h1>
                            </div>

                            <div className="grid grid-cols-2 grid-rows-1 items-start text-left bg-base-200 w-full rounded-xl p-5 pl-0 pb-0 font-code text-zinc-400">
                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-purple-500/50 mr-2" />
                                    <p className="text-lg">130 Consitent</p>
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-teal-500/50 mr-2" />
                                    <p className="text-lg">118 New</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col col-span-2 justify-center items-start text-left bg-base-200 w-full rounded-xl p-5">
                        <div className="flex flex-row justify-between items-center w-full">
                            
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold">Earnings From Subs</h1>
                                <p className="text-lg text-zinc-400 font-code">After fees and such</p>
                            </div>

                            <select className="select select-bordered bg-base-300/50" onChange={
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
                            
                            <div className="flex flex-col justify-center items-start text-left bg-base-200 rounded-xl w-fit">
                                <h1 className="text-5xl font-bold">$1,219</h1>
                            </div>

                            <div className="grid grid-cols-2 grid-rows-1 items-start text-left bg-base-200 w-full rounded-xl p-5 pl-0 pb-0 font-code text-zinc-400">
                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-primary/50 mr-2" />
                                    <p className="text-lg">1k Consistent</p>
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-orange-500/50 mr-2" />
                                    <p className="text-lg">100 New</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div className="col-span-4 flex flex-col justify-center items-start text-left bg-base-200 w-full rounded-xl p-5">
                        <div className="flex flex-row justify-between items-center w-full">
                            
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold">Recent Subs Recieved</h1>
                            </div>

                        </div>

                        <div className="flex flex-col justify-between w-full gap-2 mt-5">
                            
                            {recentEvents.length == 0 ? (
                                <div className="flex flex-row justify-center items-center text-center bg-base-200 rounded-xl w-full border-1 border-zinc-700 border py-10">
                                    <FaHeartBroken className="text-xl font-nomal font-code text-zinc-400 mr-2" /> 
                                    <h1 className="text-xl font-nomal font-code text-zinc-400">No Recent Tips</h1>
                                </div>
                            ) : (
                                <>
                                    {recentEvents.map((event:any) => {
                                        return (
                                            <IncomeEventDashboard event={event} />
                                        )
                                    })}
                                </>
                            )}

                            <button className="btn btn-primary btn-ghost mt-2">Load More</button>
                            
                        </div>
                    </div>
                    
                    
                </div>

                
            </div>
        </div>
    )

}