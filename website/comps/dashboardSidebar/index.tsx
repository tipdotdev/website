import { useRouter } from "next/router"
import { FaBullseye, FaCoins, FaDollarSign, FaExternalLinkAlt, FaHistory, FaHome, FaUsers, FaBolt, FaUser, FaCode } from "react-icons/fa"
import { IoSettingsSharp } from "react-icons/io5"

export default function DashboardSidebar({content} : {content: any}) {

    let activePage = ""

    // get the current page
    const router = useRouter()
    activePage = router.pathname.split("/")[1]

    return (

        <div className="col-span-1 drawer lg:drawer-open mt-32 z-10 w-[80vw]">
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
                            ${activePage == "dashboard" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a>
                        <FaHome className="mr-2" />
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
                    ><a>
                        <FaExternalLinkAlt className="mr-2" />
                        Your Page
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
                    ><a>
                        <FaCoins className="mr-2" />
                        Tips
                    </a></li>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "subscriptions" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a>
                        <FaUsers className="mr-2" />
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
                    ><a>
                        <FaBullseye className="mr-2" />
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
                    ><a>
                        <FaHistory className="mr-2" />
                        History
                    </a></li>

                    <div className="divider"></div>

                    <p className="text-lg mb-2 font-normal font-code">Settings</p>

                    <li
                        className={`mt-1 rounded-lg transition-all ease-in-out duration-150 cursor-pointer w-full
                            ${activePage == "payout-settings" ? (
                                "bg-primary/20"
                            ) : (
                                ""
                            )}
                        `}
                    ><a>
                        <FaDollarSign className="mr-2" />
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
                    ><a>
                        <FaBolt className="mr-2" />
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
                    ><a>
                        <FaCode className="mr-2" />
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
                    ><a>
                        <FaUser className="mr-2" />
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
                    ><a>
                        <IoSettingsSharp className="mr-2" />
                        Settings
                    </a></li>

                </ul>
            
            </div>
        </div>

    )

}