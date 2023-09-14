import { useEffect, useState } from "react"
import { FaHeartBroken, FaSquare } from "react-icons/fa"
import IncomeEventDashboard from "../incomeEventDashboard"
import Chart from "../chart"
import abbrNum from "../../utils/abbrNumber"
import Avatar from "../avatar"

export default function DashboardHome(props:any) {

    const user = props.user
    const token = props.token

    const [ greeting, setGreeting ] = useState("")
    const greetingList = ["Hey", "Yo", "Welcome", "What's up", "Hi", "Hello", "Howdy", "Greetings"]

    const randomGreeting = () => {
        const random = Math.floor(Math.random() * greetingList.length)
        setGreeting(greetingList[random])
    }

    useEffect(() => {
        randomGreeting()
    }, [])

    // state for time ranges
    const [ timeRange, setTimeRange ] = useState({
        totalIncome: {
            name: "All Time",
            value: "all"
        },
        supporters: {
            name: "All Time",
            value: "all"
        },
    })

    // states for each data type loading
    const [totalIncomeLoading, setTotalIncomeLoading] = useState(false)
    const [supportersLoading, setSupportersLoading] = useState(false)
    const [pageViewsLoading, setPageViewsLoading] = useState(false)
    const [followersLoading, setFollowersLoading] = useState(false)
    const [recentEventsLoading, setRecentEventsLoading] = useState(false)

    // states for each data type
    const [ totalIncome, setTotalIncome ] = useState({
        total: '0',
        types: {
            tips: '0',
            subscriptions: '0',
            commisions: '0',
            wishlist: '0'
        }
    })
    const [ supporters, setSupporters ] = useState({
        total: "0",
        types: {
            recurring: "0",
            oneOff: "0"
        }
    })
    const [ pageViews, setPageViews ] = useState(0)
    const [ followers, setFollowers ] = useState(abbrNum(user.followerCount, 2) || 0)
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
                pictures: {
                    avatar: "https://i.pravatar.cc/300"
                }
            }
        },

    ])

    // calculate the total income
    const calculateTotalIncome = () => {
        setTotalIncomeLoading(true)

        let total = 0
        let tips = 0
        let subscriptions = 0
        let commisions = 0
        let wishlist = 0

        // based on the time range, get the total income
        if (timeRange.totalIncome.value == "all") {
            // go though each user.incomeEvents and add the amount to the total, if there is no event, add 0
            // also add the amount to the type total
            user.incomeEvents?.forEach((event:any) => {
                total += event.amount
                if (event.type == "tip") {
                    tips += event.amount
                } else if (event.type == "subscription") {
                    subscriptions += event.amount
                } else if (event.type == "commision") {
                    commisions += event.amount
                } else if (event.type == "wishlist") {
                    wishlist += event.amount
                }
            })
        } else if (timeRange.totalIncome.value == "last30days") {
            // go through each user.incomeEvents, check the date, if it is within the last 30 days, add the amount to the total
            // also add the amount to the type total
            user.incomeEvents?.forEach((event:any) => {
                const time = new Date(event.date).getTime();
                const now = new Date().getTime();

                const diff = now - time;

                const days = Math.floor(diff / 1000 / 60 / 60 / 24);

                if (days <= 30) {
                    total += event.amount
                    if (event.type == "tip") {
                        tips += event.amount
                    } else if (event.type == "subscription") {
                        subscriptions += event.amount
                    } else if (event.type == "commision") {
                        commisions += event.amount
                    } else if (event.type == "wishlist") {
                        wishlist += event.amount
                    }
                }
            })
        } else if (timeRange.totalIncome.value == "last7days") {
            // go through each user.incomeEvents, check the date, if it is within the last 7 days, add the amount to the total
            // also add the amount to the type total
            user.incomeEvents?.forEach((event:any) => {
                const time = new Date(event.date).getTime();
                const now = new Date().getTime();

                const diff = now - time;

                const days = Math.floor(diff / 1000 / 60 / 60 / 24);

                if (days <= 7) {
                    total += event.amount
                    if (event.type == "tip") {
                        tips += event.amount
                    } else if (event.type == "subscription") {
                        subscriptions += event.amount
                    } else if (event.type == "commision") {
                        commisions += event.amount
                    } else if (event.type == "wishlist") {
                        wishlist += event.amount
                    }
                }
            })
        } else if (timeRange.totalIncome.value == "last24hours") {
            // go through each user.incomeEvents, check the date, if it is within the last 24 hours, add the amount to the total
            // also add the amount to the type total
            user.incomeEvents?.forEach((event:any) => {
                const time = new Date(event.date).getTime();
                const now = new Date().getTime();

                const diff = now - time;

                const hours = Math.floor(diff / 1000 / 60 / 60);

                if (hours <= 24) {
                    total += event.amount
                    if (event.type == "tip") {
                        tips += event.amount
                    } else if (event.type == "subscription") {
                        subscriptions += event.amount
                    } else if (event.type == "commision") {
                        commisions += event.amount
                    } else if (event.type == "wishlist") {
                        wishlist += event.amount
                    }
                }
            })
        }

        setTotalIncome({
            total: total.toLocaleString('en-US', { style: 'currency', currency: user.currency || "USD", minimumFractionDigits: 0 }),
            types: {
                tips: abbrNum(tips, 1),
                subscriptions: abbrNum(subscriptions, 1),
                commisions: abbrNum(commisions, 1),
                wishlist: abbrNum(wishlist, 1)
            }
        })

        setTotalIncomeLoading(false)
    }

    useEffect(() => {
        calculateTotalIncome()
    }, [timeRange.totalIncome])

    // calculate the total supporters
    const calculateSupporters = () => {
        setSupportersLoading(true)

        let total = 0
        let recurring = 0
        let oneOff = 0

        // based on the time range, get the total supporters
        if (timeRange.supporters.value == "all") {
            // go though each user.supporters and add the amount to the total, if there is no supporter, add 0
            // also add the amount to the type total
            user.supporters?.forEach((supporter:any) => {
                total += 1
                if (supporter.type == "recurring") {
                    recurring += 1
                } else if (supporter.type == "one-off") {
                    oneOff += 1
                }
            })
        } else if (timeRange.supporters.value == "last30days") {
            // go through each user.supporters, check the date, if it is within the last 30 days, add the amount to the total
            // also add the amount to the type total
            user.supporters?.forEach((supporter:any) => {
                const time = new Date(supporter.date).getTime();
                const now = new Date().getTime();

                const diff = now - time;

                const days = Math.floor(diff / 1000 / 60 / 60 / 24);

                if (days <= 30) {
                    total += 1
                    if (supporter.type == "recurring") {
                        recurring += 1
                    } else if (supporter.type == "one-off") {
                        oneOff += 1
                    }
                }
            })
        } else if (timeRange.supporters.value == "last7days") {
            // go through each user.supporters, check the date, if it is within the last 7 days, add the amount to the total
            // also add the amount to the type total
            user.supporters?.forEach((supporter:any) => {
                const time = new Date(supporter.date).getTime();
                const now = new Date().getTime();

                const diff = now - time;

                const days = Math.floor(diff / 1000 / 60 / 60 / 24);

                if (days <= 7) {
                    total += 1
                    if (supporter.type == "recurring") {
                        recurring += 1
                    } else if (supporter.type == "one-off") {
                        oneOff += 1
                    }
                }
            })
        } else if (timeRange.supporters.value == "last24hours") {
            // go through each user
            user.supporters?.forEach((supporter:any) => {
                const time = new Date(supporter.date).getTime();
                const now = new Date().getTime();

                const diff = now - time;

                const hours = Math.floor(diff / 1000 / 60 / 60);

                if (hours <= 24) {
                    total += 1
                    if (supporter.type == "recurring") {
                        recurring += 1
                    } else if (supporter.type == "one-off") {
                        oneOff += 1
                    }
                }
            })
        }

        setSupporters({
            total: total.toLocaleString(),
            types: {
                recurring: abbrNum(recurring, 1),
                oneOff: abbrNum(oneOff, 1)
            }
        })

        setSupportersLoading(false)
    }

    useEffect(() => {
        calculateSupporters()
    }, [timeRange.supporters])

    // get the page views
    const getPageViews = async () => {
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/analytics/pageviews/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })

        if (req.status == 200) {
            const data = await req.json()
            setPageViews(abbrNum(data.views, 2))
        }
    }

    useEffect(() => {
        getPageViews()
    }, [])

    // set recent events
    const calculateRecentEvents = () => {
        setRecentEventsLoading(true)

        // all we need o do is set the 5 most recent events
        const events:any = []

        user.incomeEvents?.forEach((event:any) => {
            events.push({
                amount: event.amount.toLocaleString('en-US', { style: 'currency', currency: user.currency || "USD", minimumFractionDigits: 0 }),
                type: {
                    name: event.type,
                    color: "red"
                },
                date: event.date,
                from: {
                    username: event.from.username,
                    pictures: {
                        avatar: event.from.pictures.avatar
                    }
                }
            })
        })

        setRecentEvents(events.slice(0, 5))
        setRecentEventsLoading(false)
    }

    useEffect(() => {
        calculateRecentEvents()
    }, [])

    // calculate the time since the account was created
    const timeSince = () => {
        const time = new Date(user.created_at).getTime();
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

    return (
        <div className="flex flex-col w-full ml-10 mb-10">
            <div className="text-center flex-col bg-base-100 w-full rounded-xl items-center">

                <div className="grid grid-cols-4 gap-2">

                <div className="col-span-4 flex flex-row justify-between items-center bg-base-200 p-5 rounded-xl">
                    <div className="flex flex-row justify-start items-center">
                        <div className="w-24 flex">
                            <Avatar user={user} />
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <h1 className="text-4xl font-extrabold ml-5">{greeting}, <span className="text-primary">{user?.username}</span></h1>
                            <div className="tooltip tooltip-bottom" data-tip="Your page is live!">
                                <p className="ml-5 mt-2">🟢 <a href={`https://tip.dev/${user?.username}`} className="text-md mt-1 font-code link link-hover link-primary text-white">tip.dev/{user?.username}</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col text-right">
                        <p className="text-md font-code text-zinc-400">Joined</p>
                        <p className="text-md font-code text-white">{timeSince()}</p>

                        {/* <p className="text-md font-code text-zinc-400 mt-2">Account Number</p>
                        <p className="text-md font-code text-white">{user.publicMetadata?.acctNum.toLocaleString() || "1"}</p> */}
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
                                        setTimeRange({
                                            ...timeRange,
                                            totalIncome: {
                                                name: e.target.value,
                                                value: e.target.value.toLowerCase().replace(" ", "")
                                            }
                                        })
                                    }
                                }>
                                    <option>All Time</option>
                                    <option>Last 30 Days</option>
                                    <option>Last 7 Days</option>
                                    <option>Last 24 Hours</option>
                                </select>

                            </div>
                            
                            <div className="flex flex-col justify-center items-start text-left w-fit mt-5">
                                {totalIncomeLoading ? (
                                    <span className="loading loading-spinner loading-lg"></span>
                                ) : (
                                    <h1 className="text-7xl font-bold">{totalIncome.total}</h1>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col justify-between w-full gap-2 mt-5">

                            <div className="grid grid-cols-1 grid-rows-4 items-start text-left bg-base-200 w-full rounded-xl p-5 pl-0 pb-0 font-code text-zinc-400">
                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-primary/50 mr-2" />
                                    {totalIncomeLoading ? (
                                        <span className="loading loading-spinner loading-sm text-zinc-400"></span>
                                    ) : (
                                        <p className="text-lg">{totalIncome.types.tips} Tips (one-off + recurring)</p>
                                    )}
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-red-500/50 mr-2" />
                                    {totalIncomeLoading ? (
                                        <span className="loading loading-spinner loading-sm text-zinc-400"></span>
                                    ) : (
                                        <p className="text-lg">{totalIncome.types.subscriptions} Subscriptions</p>
                                    )}
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-blue-500/50 mr-2" />
                                    {totalIncomeLoading ? (
                                        <span className="loading loading-spinner loading-sm text-zinc-400"></span>
                                    ) : (
                                        <p className="text-lg">{totalIncome.types.commisions} Commisions</p>
                                    )}
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-green-500/50 mr-2" />
                                    {totalIncomeLoading ? (
                                        <span className="loading loading-spinner loading-sm text-zinc-400"></span>
                                    ) : (
                                        <p className="text-lg">{totalIncome.types.wishlist} Wishlist purchases</p>
                                    )}
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
                                    setTimeRange({
                                        ...timeRange,
                                        supporters: {
                                            name: e.target.value,
                                            value: e.target.value.toLowerCase().replace(" ", "")
                                        }
                                    })
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
                                {supportersLoading ? (
                                    <span className="loading loading-spinner loading-lg"></span>
                                ) : (
                                    <h1 className="text-5xl font-bold">{supporters.total}</h1>
                                )}
                            </div>

                            <div className="grid grid-cols-2 grid-rows-1 items-start text-left bg-base-200 w-full rounded-xl p-5 pl-0 pb-0 font-code text-zinc-400">
                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-purple-500/50 mr-2" />
                                    {supportersLoading ? (
                                        <span className="loading loading-spinner loading-sm text-zinc-400"></span>
                                    ) : (
                                        <p className="text-lg">{supporters.types.recurring} Recurring</p>
                                    )}
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-teal-500/50 mr-2" />
                                    {supportersLoading ? (
                                        <span className="loading loading-spinner loading-sm text-zinc-400"></span>
                                    ) : (
                                        <p className="text-lg">{supporters.types.oneOff} One-off</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-1 grid grid-cols-2 justify-center items-start text-left bg-base-200 w-full rounded-xl p-5">

                        <div className="flex flex-row justify-between items-center w-full">
                            
                            <div className="flex flex-col justify-start items-start w-full">
                                <h1 className="text-2xl font-bold">Views</h1>
                                {pageViewsLoading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    <h1 className="text-5xl font-bold mt-5 w-full flex flex-row">{pageViews?.toLocaleString() || 0}</h1>
                                )}
                            </div>


                        </div>
                        
                    </div>

                    <div className="flex flex-col justify-center items-start text-left bg-base-200 w-full rounded-xl p-5">
                        <div className="flex flex-row justify-between items-center w-full">
                            
                            <div className="flex flex-col justify-start items-start">
                                <h1 className="text-2xl font-bold">Followers</h1>
                                {followersLoading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    <h1 className="text-5xl font-bold mt-5 w-full flex flex-row">{followers.toLocaleString()}</h1>
                                )}
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
                            
                            {recentEventsLoading ? (
                                <span className="loading loading-spinner loading-lg"></span>
                            ) : (
                                <>
                                    {recentEvents.length == 0 ? (
                                        <div className="flex flex-row justify-center items-center text-center bg-base-200 rounded-xl w-full border-1 border-zinc-700 border py-10">
                                            <FaHeartBroken className="text-xl font-nomal font-code text-zinc-400 mr-2" /> 
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
                                </>
                            )}

                            <a href="/dashboard/history" className="btn btn-ghost mt-2">View More</a>
                            
                        </div>
                    </div>
                    
                </div>

                
            </div>
        </div>
    )

}