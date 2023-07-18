import { FaDiscord, FaRegCopyright, FaTwitter } from "react-icons/fa";

export default function DashboardFooter() {
    return (
        <footer className="md:footer hidden p-4 bg-base-100 text-base-content absolute bottom-0 z-[99] px-20">

            <div className="items-center grid-flow-col text-zinc-200/50 font-bold text-sm">
                <p>{"{$}"}</p>
                <FaRegCopyright />
                <p>2023 TIP.DEV</p>
                <p>|</p>
                <a href="/terms" className="link link-hover link-primary text-inherit">TERMS</a>
                <a href="/privacy" className="link link-hover link-primary text-inherit">PRIVACY</a>
            </div> 
            <div className="grid-flow-col  gap-4 md:place-self-center md:justify-self-end text-sm text-zinc-200/50">
                <a className="text-2xl hover:opacity-40 transition-all ease-in-out duration-150 cursor-pointer" href="https://twitter.com/tipthisdev" target="_blank">
                    <FaTwitter />
                </a>

                <a className="text-2xl hover:opacity-40 transition-all ease-in-out duration-150 cursor-pointer" href="https://discord.gg/DsxygKZe54" target="_blank">
                    <FaDiscord />
                </a>
            </div>

        </footer>
    )
}