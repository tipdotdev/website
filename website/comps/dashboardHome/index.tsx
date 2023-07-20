import { useEffect, useState } from "react"
import { FaSquare } from "react-icons/fa"
import IncomeEventDashboard from "../incomeEventDashboard"
import Chart from "../chart"

export default function DashboardHome(props:any) {

    const user = props.user

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

    const [ recentEvents, setRecentEvents ] = useState([

        {
            amount: "$125",
            type: {
                name: "Tip",
                color: "red"
            },
            date: "10 minutes ago",
            from: {
                username: "Someone",
                imageUrl: "https://i.pravatar.cc/300"
            }
        },

        {
            amount: "$10",
            type: {
                name: "Sub",
                color: "red"
            },
            date: "2 hours ago",
            from: {
                username: "Haste",
                imageUrl: "https://i.pravatar.cc/290"
            }
        },

        {
            amount: "$200",
            type: {
                name: "Tip",
                color: "red"
            },
            date: "4 hours ago",
            from: {
                username: "Someone",
                imageUrl: "https://i.pravatar.cc/100"
            }
        },

        {
            amount: "$50",
            type: {
                name: "Tip",
                color: "red"
            },
            date: "5 hours ago",
            from: {
                username: "Fab",
                imageUrl: "https://i.pravatar.cc/390"
            }
        }

    ])

    // calculate the time since the account was created
    const timeSince = () => {
        const time = new Date(user.createdAt).getTime();
        const now = new Date().getTime();

        const diff = now - time;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (days < 30) {
            return `${days} days ago`;
        } else if (months < 12) {
            return `${months} months ago`;
        }
    };

    const [ data, setData ] = useState({
        labels: ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Page Views',
            data: [0.1, 0.4, 0.2, 0.3, 0.7, 0.4, 0.6, 0.3],
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            barThickness: 10,
        }]
    })

    return (
        <div className="flex flex-col w-full ml-10 mb-10">
            <div className="text-center flex-col bg-base-100 w-full rounded-xl items-center">
                

                {/* <div className="divider"></div>  */}

                <div className="grid grid-cols-4 gap-2">

                <div className="col-span-4 flex flex-row justify-between items-center bg-base-200 p-5 rounded-xl">
                    <div className="flex flex-row justify-start items-center">
                        <img src={user?.imageUrl} className="mask mask-circle w-24" />
                        <div className="flex flex-col justify-start items-start">
                            <h1 className="text-4xl font-extrabold ml-5">{greeting}, <span className="text-primary">{user?.username}</span></h1>
                            <div className="tooltip tooltip-bottom" data-tip="Your page is live!">
                                <p className="ml-5 mt-2">🟢 <a href={`https://tip.dev/${user?.username}`} className="text-md mt-1 font-code link link-hover link-primary text-white">tip.dev/{user?.username}</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col text-right">
                        <p className="text-md font-code text-zinc-400">Account Created</p>
                        <p className="text-md font-code text-white">{timeSince()}</p>

                        <p className="text-md font-code text-zinc-400 mt-2">Account Number</p>
                        <p className="text-md font-code text-white">{user.publicMetadata.acctNum.toLocaleString() || "1"}</p>
                    </div>
                </div>

                    <div className="col-span-2 row-span-2 flex flex-col justify-between items-start text-left bg-base-200 w-full rounded-xl p-5">

                        <div className="flex flex-col items-start w-full">
                            <div className="flex flex-row justify-between items-start w-full">
                                
                                <div className="flex flex-col justify-start items-start">
                                    <h1 className="text-2xl font-bold">Take Home Money</h1>
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
                            
                            <div className="flex flex-col justify-center items-start text-left w-fit mt-5">
                                <h1 className="text-7xl font-bold">$136,482</h1>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between w-full gap-2 mt-5">

                            <div className="grid grid-cols-1 grid-rows-4 items-start text-left bg-base-200 w-full rounded-xl p-5 pl-0 pb-0 font-code text-zinc-400">
                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-primary/50 mr-2" />
                                    <p className="text-lg">$125k Tips (one-off + recurring)</p>
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-red-500/50 mr-2" />
                                    <p className="text-lg">$1.2k Subscriptions</p>
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-blue-500/50 mr-2" />
                                    <p className="text-lg">$2.4k Commisions</p>
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-green-500/50 mr-2" />
                                    <p className="text-lg">$3.3k Wishlist purchases</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div className="flex flex-col col-span-2 justify-center items-start text-left bg-base-200 w-full rounded-xl p-5">
                        <div className="flex flex-row justify-between items-center w-full">
                            
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold">Supporters</h1>
                                <p className="text-lg text-zinc-400 font-code">Annonymous and registered users</p>
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
                                <h1 className="text-5xl font-bold">3,297</h1>
                            </div>

                            <div className="grid grid-cols-2 grid-rows-1 items-start text-left bg-base-200 w-full rounded-xl p-5 pl-0 pb-0 font-code text-zinc-400">
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

                    <div className="col-span-1 grid grid-cols-2 justify-center items-start text-left bg-base-200 w-full rounded-xl p-5">

                        <div className="flex flex-row justify-between items-center w-full">
                            
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold">Page Views</h1>
                                
                                <h1 className="text-5xl font-bold mt-5 w-full flex flex-row">10,482</h1>
                            </div>


                        </div>
                        
                    </div>

                    <div className="flex flex-col justify-center items-start text-left bg-base-200 w-full rounded-xl p-5">
                        <div className="flex flex-row justify-between items-center w-full">
                            
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold">Followers</h1>
                                
                                <h1 className="text-5xl font-bold mt-5 w-full flex flex-row">391,203</h1>
                            </div>


                        </div>
                    </div>

                    <div className="col-span-4 flex flex-col justify-center items-start text-left bg-base-200 w-full rounded-xl p-5">
                        <div className="flex flex-row justify-between items-center w-full">
                            
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold">Recent Income Events</h1>
                            </div>

                        </div>

                        <div className="flex flex-col justify-between w-full gap-2 mt-5">
                            
                            {recentEvents.length == 0 ? (
                                <div className="flex flex-col justify-center items-center text-center bg-base-200 rounded-xl w-full">
                                    <h1 className="text-xl font-nomal font-code text-zinc-400">No Recent Events</h1>
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
                            
                        </div>
                    </div>
                    
                </div>

                
            </div>
        </div>
    )

}