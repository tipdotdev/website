import { SignOutButton, useUser } from "@clerk/nextjs";
import { FaArrowCircleLeft, FaBars, FaGripVertical, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
    const { isLoaded, isSignedIn, user } = useUser()
    return (
        <div className="navbar w-[93%] bg-base-200 mb-5 top-3 fixed rounded-xl">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <FaBars className="h-6 w-6" />
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
                    <li><a
                        href={`/about`}
                    >
                        About
                    </a></li>
                    <li><a
                        href={`/pricing`}
                    >
                        Pricing
                    </a></li>
                    <li><a
                        href={`/blog`}
                    >
                        Blog
                    </a></li>
                </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl" href="/">
                    <img src="/logo-no-bg-v3.png" className="h-10 w-fit" />
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a
                        href={`/about`}
                    >
                        About
                    </a></li>
                    <li><a
                        href={`/pricing`}
                    >
                        Pricing
                    </a></li>
                    <li><a
                        href={`/blog`}
                    >
                        Blog
                    </a></li>
                </ul>
            </div>
            {isSignedIn ? ( 
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img src={user.imageUrl} />
                            </div>
                        </label>
                        <div className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-200 rounded-box w-52">
                            <p className="text-lg mb-2">Hey, <span className="text-lg font-bold text-primary">{user.username}</span></p>
                            <ul tabIndex={0} className="">
                                <li>
                                    <a className="justify-start" href='/account'>
                                        <FaUserCircle className="mr-2" />
                                        Account
                                    </a>
                                </li>
                                <li>
                                    <a className="justify-start" href='/dashboard'>
                                        <FaGripVertical className="mr-2" />
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a className="justify-start">
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