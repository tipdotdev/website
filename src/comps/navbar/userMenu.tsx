import { FaArrowCircleLeft, FaBars, FaCoins, FaDollarSign, FaEnvelope, FaGripVertical, FaQuestion, FaStar, FaUserCircle } from "react-icons/fa"
import Avatar from "../avatar"
import PlusIcon from "../plusIcon"
import FeatureRequestPopup from "./featurePopup"

export default function UserMenu(props:any) {
    const user = props.user
    const logout = props.logout

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0}>
                <div className="flex flex-row items-center justify-center border-1 border-zinc-500 border p-1 rounded-full 
                    hover:bg-neutral-600 transition-all ease-in-out duration-150 cursor-pointer
                ">
                    <div className="w-8 flex">
                        <Avatar user={user} />
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2 w-6 h-6 text-zinc-300 ml-2 mr-2" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                </div>
            </label>
            <div className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-300 rounded-box w-[20em] z-[99] border border-zinc-800">
                <p className="text-xl flex flex-row font-medium">Hey, <span className="text-2xl font-bold text-primary ml-1">{user?.username}</span> 
                
                    {user?.isPremium &&
                        <PlusIcon className="w-3 h-3"/>
                    }

                </p>

                <div className="flex flex-row justify-start items-center mt-1">
                    <div className="animate-pulse bg-success rounded-lg h-3 w-3"></div> 

                    <div className="tooltip tooltip-bottom" data-tip="Your page is live!">
                        <a href={`/${user?.username}`} className="text-md ml-2 font-code link link-hover link-primary text-zinc-400">tip.dev/{user?.username}</a>
                    </div>
                </div>

                <div className="divider"></div>
                <p className="text-lg mb-2 font-bold">Quick Links</p>
                <ul tabIndex={0} className="pl-0 w-full -ml-2">
                    <li>
                        <a className="justify-start" href='/dashboard'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-dashboard mr-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h6v8h-6z" /><path d="M4 16h6v4h-6z" /><path d="M14 12h6v8h-6z" /><path d="M14 4h6v4h-6z" /></svg>
                            Dashboard
                        </a>
                    </li>

                    <li>
                        <a className="justify-start" href={`/${user?.username}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user mr-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                            Your page
                        </a>
                    </li>

                    <li>
                        <a className="justify-start" href='/dashboard/earnings'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-pig-money mr-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 11v.01" /><path d="M5.173 8.378a3 3 0 1 1 4.656 -1.377" /><path d="M16 4v3.803a6.019 6.019 0 0 1 2.658 3.197h1.341a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-1.342c-.336 .95 -.907 1.8 -1.658 2.473v2.027a1.5 1.5 0 0 1 -3 0v-.583a6.04 6.04 0 0 1 -1 .083h-4a6.04 6.04 0 0 1 -1 -.083v.583a1.5 1.5 0 0 1 -3 0v-2l0 -.027a6 6 0 0 1 4 -10.473h2.5l4.5 -3h0z" /></svg>
                            Earnings
                        </a>
                    </li>

                    <li>
                        <a className="justify-start" href="https://tipdev.featurebase.app" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star-filled mr-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" /></svg>
                            Give Feedback
                        </a>
                    </li>

                    {/* <li>
                        <a className="justify-start" href='/messages'>
                            <FaEnvelope className="mr-2" />
                            Messages
                        </a>
                    </li> */}

                    <div className="divider"></div>
                    
                    <li onClick={(e) => {
                        logout("/")
                    }}>
                        <a className="justify-start text-error hover:bg-error/40 hover:text-red-400 ">
                            <FaArrowCircleLeft className="mr-2" />
                            Sign Out
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}