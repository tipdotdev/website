import { FaBars } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function ComingSoonNavbar() {

    // on scroll, change navbar bg color
    const [ scroll, setScroll ] = useState(false)
    
    useEffect(() => {
        // The debounce function receives our function as a parameter
        const debounce = (fn:any) => {
            // This holds the requestAnimationFrame reference, so we can cancel it if we wish
            let frame:any;
            // The debounce function returns a new function that can receive a variable number of arguments
            return (...params:any) => {
                // If the frame variable has been defined, clear it now, and queue for next frame
                if (frame) {
                    cancelAnimationFrame(frame);
                }
                // Queue our function call for the next frame
                frame = requestAnimationFrame(() => {
                    // Call our function and pass any params we received
                    fn(...params);
                });
            }
        };

        // determine if user has scrolled down, if so change scroll state to true
        const storeScroll = () => {
            setScroll(window.scrollY > 10)
        }

        // Listen for scroll events
        document.addEventListener('scroll', debounce(storeScroll), { passive: true });

    })

    useEffect(() => {
        if (scroll) {
            document.getElementById("navbar")?.classList.remove("bg-opacity-0")
            document.getElementById("navbar")?.classList.add("bg-opacity-100")
        } else {
            document.getElementById("navbar")?.classList.remove("bg-opacity-100")
            document.getElementById("navbar")?.classList.add("bg-opacity-0")
        }
    }, [scroll])

    return (
        <div id="navbar" className="navbar w-[95%] bg-base-200 bg-opacity-0 mb-5 top-2 fixed rounded-xl transition-all ease-in-out duration-200 z-[1000]">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <FaBars className="h-6 w-6" />
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52">
                    <li>
                        <a>Product</a>
                        <ul className="p-2">
                            <li><a>Overview</a></li>
                            <li><a>Use Cases</a></li>
                            <li><a>Marketing</a></li>
                            <li><a>Integrations</a></li>
                            <li><a>Payout</a></li>
                        </ul>
                    </li>
                    <li><a
                        href={``}
                    >
                        Pricing
                    </a></li>
                    <li><a
                        href={`/blog`}
                    >
                        Blog
                    </a></li>
                    <li><a
                        href={``}
                    >
                        Docs
                    </a></li>
                </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl" href="/">
                    <img src="/logo-no-bg-v3.png" className="h-10" />
                    <p className="sm:inline-block hidden">tip.dev</p>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li tabIndex={0}>
                        <details>
                        <summary>Product</summary>
                        <ul className="p-2 w-[10rem] bg-base-200">
                            <li><a>Overview</a></li>
                            <li><a>Use Cases</a></li>
                            <li><a>Marketing</a></li>
                            <li><a>Integrations</a></li>
                            <li><a>Payout</a></li>
                        </ul>
                        </details>
                    </li>
                    <li><a
                        href={``}
                    >
                        Pricing
                    </a></li>
                    <li><a
                        href={`/blog`}
                    >
                        Blog
                    </a></li>
                    <li><a
                        href={``}
                    >
                        Docs
                    </a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-primary px-8">Coming Soon</a>
            </div>
        </div>
    )
}