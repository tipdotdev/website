import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";

export default function DashboardFooter() {
    return (
        <footer className="md:footer hidden p-4 bg-transparent text-base-content fixed bottom-0 z-[99] px-20">

            <div className="items-center grid-flow-col text-zinc-200/50 font-bold text-sm">
                <p>{"{$}"} ©️ 2023 TIP.DEV</p>
                <p>|</p>
                <a href="/terms" className="link link-hover link-primary text-inherit">TERMS</a>
                <a href="/privacy" className="link link-hover link-primary text-inherit">PRIVACY</a>
            </div> 
            <div className="grid-flow-col  gap-4 md:place-self-center md:justify-self-end text-sm text-zinc-200/50">
                <a className="text-2xl hover:opacity-40 transition-all ease-in-out duration-150 cursor-pointer" href="https://twitter.com/tipdotdev" target="_blank">
                    <FaTwitter />
                </a>

                <a className="text-2xl hover:opacity-40 transition-all ease-in-out duration-150 cursor-pointer" href="/discord" target="_blank">
                    <FaDiscord />
                </a>

                <a className="text-2xl hover:opacity-40 transition-all ease-in-out duration-150 cursor-pointer" href="https://instagram.com/tipdotdev" target="_blank">
                    <FaInstagram />
                </a>
            </div>

        </footer>
    )
}