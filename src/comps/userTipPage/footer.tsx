import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import StatusPageEmbed from "../statusPage";

export default function TipPageFooter(props:any) {
    return (
        <>
            <footer className="footer items-center p-4 bg-base-100 text-neutral-content">
                <aside className="items-center grid-flow-col">
                    <aside className="">
                        <a href="/" className="btn btn-ghost btn-neutral text-zinc-400 btn-sm hover:bg-neutral normal-case"><img src="/svg/logo-white.svg" className="h-5 w-fit" /> tip.dev</a>
                    </aside>
                </aside> 
                <nav className="grid-flow-col md:place-self-center md:justify-self-end">
                    <StatusPageEmbed />
                </nav>
            </footer>
        </>
    )
}