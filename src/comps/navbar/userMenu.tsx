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

                    <FaBars className="w-6 h-6 text-zinc-300 ml-2 mr-2" />
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
                            <FaGripVertical className="mr-2" />
                            Dashboard
                        </a>
                    </li>

                    <li>
                        <a className="justify-start" href={`/${user?.username}`}>
                            <FaUserCircle className="mr-2" />
                            Your page
                        </a>
                    </li>

                    <li>
                        <a className="justify-start" href='/dashboard/earnings'>
                            <FaCoins className="mr-2" />
                            Earnings
                        </a>
                    </li>

                    <li>
                        <a className="justify-start" href="https://tipdev.featurebase.app" target="_blank">
                            <FaStar className="mr-2" />
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