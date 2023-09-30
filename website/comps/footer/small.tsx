import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";

export default function SmallFooter(props:any) {
    return (
        <>
            <footer className="footer px-10 py-4 bg-base-200 text-base-content w-screen">
                <aside className="items-center grid-flow-col">
                    <img src="/svg/logo-white.svg" className="h-8 w-fit" />
                    <p>Tip.dev LLC.<br/>© 2023 All rights reserved.</p>
                </aside> 
                <nav className="md:place-self-center md:justify-self-end">
                    <div className="grid grid-flow-col gap-4">
                        <a className="cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-150 text-2xl"
                            href="https://twitter.com/tipdotdev" target="_blank"
                        >
                            <FaTwitter />
                        </a> 

                        <a className="cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-150 text-2xl"
                            href="/discord" target="_blank"
                        >
                            <FaDiscord />
                        </a> 

                        <a className="cursor-pointer hover:text-zinc-400 transition-all ease-in-out duration-150 text-2xl"
                            href="https://instagram.com/tipdotdev" target="_blank"
                        >
                            <FaInstagram />
                        </a> 
                    </div>
                </nav>
            </footer>
        </>
    )
}