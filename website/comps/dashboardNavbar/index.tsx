import { FaArrowCircleLeft, FaBars, FaDollarSign, FaEnvelope, FaGripVertical, FaUserCircle } from "react-icons/fa";
import { SignOutButton, useUser } from "@clerk/nextjs"

export default function DashboardTopNav() {
    const { isLoaded, isSignedIn, user } = useUser()
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
                            <div className="flex flex-row items-center justify-center border-1 border-zinc-500 border p-1 rounded-full 
                                hover:bg-neutral transition-all ease-in-out duration-150 cursor-pointer
                            ">
                                <img src={user.imageUrl} className="rounded-full w-8" />
                                <FaBars className="w-6 h-6 text-zinc-300 ml-2 mr-2" />
                            </div>
                        </label>
                        <div className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-200 rounded-box w-52 z-[99]">
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