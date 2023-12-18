import { useRouter } from "next/router"
import { FaBullseye, FaCoins, FaDollarSign, FaExternalLinkAlt, FaHistory, FaHome, FaUsers, FaBolt, FaUser, FaCode, FaPencilRuler } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5"

export default function DashboardSidebar({content, user} : {content: any, user:any}) {

    let activePage = ""

    // get the current page
    const router = useRouter()
    activePage = router.pathname.split("/")[2]

    return (

        <div className="col-span-1 drawer lg:drawer-open mt-32 z-10 w-[80vw] h-fit top-0 mb-20">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-start">
                
                {content}

                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            
            </div> 

            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-fit h-full bg-transparent text-base-content text-md font-medium">
                {/* Sidebar content here */}
                    <li
                        className={`rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == undefined ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                        Home
                    </a></li>

                    <li
                        className={`mt-3 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "yourpage" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href={`/${user?.username}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-external-link mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>
                        Your Page
                    </a></li>

                    <li
                        className={`mt-3 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "profile" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href={`/dashboard/profile`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit-circle mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 15l8.385 -8.415a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3z" /><path d="M16 5l3 3" /><path d="M9 7.07a7 7 0 0 0 1 13.93a7 7 0 0 0 6.929 -6" /></svg>
                        Profile
                    </a></li>

                    <div className="divider"></div>

                    <p className="text-lg mb-2 font-normal font-code">Earn</p>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "tips" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard/tips">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pig-money mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 11v.01" /><path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" /><path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z" /></svg>
                        Tips
                    </a></li>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "subscribers" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard/subscribers">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-users-group mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>
                        Subscribers
                    </a></li>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "goals" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard/goals">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-target-arrow mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 7a5 5 0 1 0 5 5" /><path d="M13 3.055a9 9 0 1 0 7.941 7.945" /><path d="M15 6v3h3l3 -3h-3v-3z" /><path d="M15 9l-3 3" /></svg>
                        Goals
                    </a></li>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "earnings-history" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard/earnings-history">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-history mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8l0 4l2 2" /><path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" /></svg>
                        History
                    </a></li>

                    <div className="divider"></div>

                    <p className="text-lg mb-2 font-normal font-code">Settings</p>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "payout" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard/payout">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-building-bank mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l18 0" /><path d="M3 10l18 0" /><path d="M5 6l7 -3l7 3" /><path d="M4 10l0 11" /><path d="M20 10l0 11" /><path d="M8 14l0 3" /><path d="M12 14l0 3" /><path d="M16 14l0 3" /></svg>
                        Payout
                    </a></li>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "integrations" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard/integrations">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bolt mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" /></svg>
                        Integrations
                    </a></li>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "buttons" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard/buttons">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-click mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12l3 0" /><path d="M12 3l0 3" /><path d="M7.8 7.8l-2.2 -2.2" /><path d="M16.2 7.8l2.2 -2.2" /><path d="M7.8 16.2l-2.2 2.2" /><path d="M12 12l9 3l-4 2l-2 4l-3 -9" /></svg>
                        Buttons
                    </a></li>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "account" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard/account">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                        Account
                    </a></li>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "settings" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a href="/dashboard/settings">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings mr-2" width="22" height="22" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                        Settings
                    </a></li>

                </ul>
            
            </div>
        </div>

    )

}