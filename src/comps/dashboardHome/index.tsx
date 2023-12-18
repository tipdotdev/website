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
    const [ followers, setFollowers ] = useState(abbrNum(user?.followerCount, 2) || 0)
    const [ recentEvents, setRecentEvents ] = useState([])

    // get income events
    const getIncomeEvents = async () => {
        setTotalIncomeLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/me/income/${timeRange.totalIncome.value}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.ok) {
            const data = await res.json()
            user.incomeEvents = data.incomeEvents.data
            user.totalIncome = data.totalIncome

            calculateTotalIncome()
            calculateRecentEvents()
            setTotalIncomeLoading(false)
        }
    }

    // calculate the total income
    const calculateTotalIncome = () => {
        setTotalIncomeLoading(true)

        let total = user.totalIncome.total
        let tips = user.totalIncome.types.tip
        let subscriptions = user.totalIncome.types.subscription
        let commisions = user.totalIncome.types.commision
        let wishlist = user.totalIncome.types.wishlist

        setTotalIncome({
            total: (total/100).toLocaleString('en-US', { style: 'currency', currency: user.currency || "USD", minimumFractionDigits: 0 }),
            types: {
                tips: abbrNum((tips/100), 1),
                subscriptions: abbrNum((subscriptions/100), 1),
                commisions: abbrNum((commisions/100), 1),
                wishlist: abbrNum((wishlist/100), 1)
            }
        })

        setTotalIncomeLoading(false)
    }

    useEffect(() => {
        if (!props.isAuthLoading && user) {
            getIncomeEvents()
        }
    }, [timeRange.totalIncome, props.isAuthLoading, user])

    // get the supporters
    const getSupporters = async () => {
        setSupportersLoading(true)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/me/supporters/${timeRange.supporters.value}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.ok) {
            const data = await res.json()

            if (user) {
                user.supporters = data.supporters
            }

            calculateSupporters()
            setSupportersLoading(false)
        }
    }

    // calculate the total supporters
    const calculateSupporters = () => {
        setSupportersLoading(true)

        let total = 0
        let recurring = 0
        let oneOff = 0

        // user.supporters is an object with the keys as the email of the supporter, and the value as an array of all the events from that supporter
        for (const [key, value] of Object.entries(user?.supporters)) {
            // how many supporters there are is how many keys there are
            total++

            for (let i = 0; i < (value as any[]).length; i++) {
                // if the key has more than one event, it is recurring
                // so we want to add one to recurring for just the key not each event
                if ((value as any[]).length > 1) {
                    recurring++
                    break
                } else {
                    oneOff++
                }
            }
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
        if (!props.isAuthLoading && user) {
            getSupporters()
        }
    }, [timeRange.supporters, props.isAuthLoading, user])

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

    // set recent events
    const calculateRecentEvents = () => {
        setRecentEventsLoading(true)

        // all we need o do is set the 5 most recent events
        const events:any = []
        
        for (let i = 0; i < user?.incomeEvents?.length; i++) {
            let from = JSON.parse(user?.incomeEvents[i].metadata.tipper)
            events.push({
                id: user?.incomeEvents[i].id,
                amount: ((user?.incomeEvents[i].amount)/100).toLocaleString('en-US', { style: 'currency', currency: user?.currency || "USD", minimumFractionDigits: 0 }),
                type: {
                    name: user?.incomeEvents[i].metadata.type,
                    color: "red"
                },
                message: user?.incomeEvents[i].metadata.message,
                // calculate the date from a unix timestamp
                date: user?.incomeEvents[i].created,
                from: {
                    username: from.username || from.name || "Someone",
                    pictures: {
                        avatar: from.pictures?.avatar || 'https://cdn.tip.dev/tipdev/avatars/default.jpeg'
                    }
                }
            })
        }

        setRecentEvents(events.slice(0, 5))
        setRecentEventsLoading(false)
    }

    useEffect(() => {
        if (!props.isAuthLoading && user) {
            getPageViews()
            getIncomeEvents()
            getSupporters()
            calculateRecentEvents()
        }
    }, [props.isAuthLoading, user])

    // calculate the time since the account was created
    const timeSince = () => {
        const time = new Date(user?.created_at).getTime();
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

    if (props.isAuthLoading || !user) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full ml-10 mb-10">
            <div className="text-center flex-col bg-base-100 w-full rounded-xl items-center">

                <div className="grid grid-cols-4 gap-2">

                <div className="col-span-4 flex flex-row justify-between items-center bg-base-200 p-5 rounded-xl">
                    <div className="flex flex-row justify-start items-center">
                        <div className="w-24 flex">
                            <a className=""
                                href="/dashboard/account"
                            >
                                <Avatar user={user}
                                    className="hover:opacity-60 transition-all ease-in-out duration-150"
                                />
                            </a>
                        </div>
                        <div className="flex flex-col justify-start items-start">
                            <h1 className="text-4xl font-extrabold ml-5">{greeting}, <span className="text-primary">{user?.username}</span></h1>

                            <div className="flex flex-row justify-start items-center mt-2 ml-5">
                                <div className="animate-pulse bg-success rounded-lg h-3 w-3"></div> 

                                <div className="tooltip tooltip-bottom" data-tip="Your page is live!">
                                    <a href={`https://tip.dev/${user?.username}`} className="text-md ml-2 font-code link link-hover link-primary text-white">tip.dev/{user?.username}</a>
                                </div>
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
                                        <p className="text-lg">${totalIncome.types.tips} Tips</p>
                                    )}
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-red-500/50 mr-2" />
                                    {totalIncomeLoading ? (
                                        <span className="loading loading-spinner loading-sm text-zinc-400"></span>
                                    ) : (
                                        <p className="text-lg">${totalIncome.types.subscriptions} Subscriptions</p>
                                    )}
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-blue-500/50 mr-2" />
                                    {totalIncomeLoading ? (
                                        <span className="loading loading-spinner loading-sm text-zinc-400"></span>
                                    ) : (
                                        <p className="text-lg">${totalIncome.types.commisions} Commisions</p>
                                    )}
                                </div>

                                <div className="flex flex-row justify-start items-center">
                                    <FaSquare className="w-5 h-5 text-green-500/50 mr-2" />
                                    {totalIncomeLoading ? (
                                        <span className="loading loading-spinner loading-sm text-zinc-400"></span>
                                    ) : (
                                        <p className="text-lg">${totalIncome.types.wishlist} Wishlist purchases</p>
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
                                            {/* <FaHeartBroken className="text-xl font-nomal font-code text-zinc-400 mr-2" />  */}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart-broken" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /><path d="M12 6l-2 4l4 3l-2 4v3" /></svg>
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