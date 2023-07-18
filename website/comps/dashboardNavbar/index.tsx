import { FaArrowCircleLeft, FaBars, FaBell, FaDollarSign, FaEnvelope, FaGripVertical, FaUserCircle } from "react-icons/fa";
import { SignOutButton, useUser } from "@clerk/nextjs"
import { useState } from "react";
import NavNotif from "./notification";

export default function DashboardTopNav() {
    const { isLoaded, isSignedIn, user } = useUser()

    const [notifications, setNotifications] = useState([])

    return (
        <div className="navbar w-full bg-base-100 mb-5 top-0 fixed px-32 py-5 z-[100]">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl" href="/">
                    <img src="/logo-no-bg-v3.png" className="h-10 w-fit" />
                </a>
            </div>
            
            {isSignedIn ? ( 
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0}>
                            <div className="btn btn-ghost btn-circle mr-5">
                                <div className="indicator justify-center items-center">
                                    {notifications.length > 0 && (
                                        <span className="indicator-item badge badge-primary indicator-top indicator-end"></span> 
                                    )}
                                    <div className="text-zinc-300">
                                        <FaBell className="w-7 h-7" />
                                    </div>
                                </div>
                            </div>
                        </label>
                        <div className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-300 rounded-box w-52 z-[99]">
                            <p className="text-lg">Notifications</p>
                            <div className="divider mt-1 mb-1"></div>
                            <ul tabIndex={0} className="">
                                {notifications.length == 0 && (
                                    <li>
                                        <p>
                                            No notifications yet.
                                        </p>
                                    </li>
                                )}
                                {notifications.map((notification) => (
                                    <NavNotif />
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0}>
                            <div className="flex flex-row items-center justify-center border-1 border-zinc-500 border p-1 rounded-full 
                                hover:bg-neutral transition-all ease-in-out duration-150 cursor-pointer
                            ">
                                <img src={user.imageUrl} className="mask mask-circle w-8" />
                                <FaBars className="w-6 h-6 text-zinc-300 ml-2 mr-2" />
                            </div>
                        </label>
                        <div className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-300 rounded-box w-52 z-[99]">
                            <p className="text-lg">Hey, <span className="text-lg font-bold text-primary">{user.username}</span></p>
                            <div className="divider"></div>
                            <p className="text-lg mb-2 font-bold">Quick Links</p>
                            <ul tabIndex={0} className="">
                                <li>
                                    <a className="justify-start" href='/dashboard'>
                                        <FaGripVertical className="mr-2" />
                                        Dashboard
                                    </a>
                                </li>

                                <li>
                                    <a className="justify-start" href='/account'>
                                        <FaUserCircle className="mr-2" />
                                        Your Page
                                    </a>
                                </li>

                                <li>
                                    <a className="justify-start" href='/account'>
                                        <FaDollarSign className="mr-2" />
                                        Earnings
                                    </a>
                                </li>

                                <li>
                                    <a className="justify-start" href='/account'>
                                        <FaEnvelope className="mr-2" />
                                        Messages
                                    </a>
                                </li>

                                <div className="divider"></div>
                                
                                <li>
                                    <a className="justify-start text-red-400">
                                        <FaArrowCircleLeft className="mr-2" />
                                        <SignOutButton/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="navbar-end">
                    <a className="btn btn-primary px-8" href="/onboarding/signup">Get Started</a>
                </div>
            )}
        </div>
    )
}