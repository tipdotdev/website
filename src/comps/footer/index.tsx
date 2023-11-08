import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";
import StatusPageEmbed from "../statusPage";

export default function Footer(props:any) {
    return (
        <>
            <footer className="footer p-10 text-base-content w-screen bg-base-200">
                <nav>
                    <header className="footer-title">Product</header> 
                    <a className="link link-hover" href="">Overview</a> 
                    <a className="link link-hover" href="">Use cases</a> 
                    <a className="link link-hover" href="">Marketing</a> 
                    <a className="link link-hover" href="">Integrations</a> 
                    <a className="link link-hover" href="">Payout</a> 
                </nav> 
                <nav>
                    <header className="footer-title">Support</header> 
                    <a className="link link-hover" target="_blank" href="mailto:hi@tip.dev">Contact us</a> 
                    <a className="link link-hover" target="_blank" href="https://docs.tip.dev">Documentation</a> 
                    <a className="link link-hover" target="_blank" href="/discord">Discord server</a> 
                    <a className="link link-hover" target="_blank" href="https://status.tip.dev">Status</a>
                    <a className="link link-hover" target="_blank" href="https://tipdev.featurebase.app/">Give us Feedback</a>
                </nav> 
                <nav>
                    <header className="footer-title">Company</header> 
                    <a className="link link-hover" href="">About us</a> 
                    <a className="link link-hover" href="/blog">Blog</a>
                    <a className="link link-hover" href="">Jobs</a> 
                    <a className="link link-hover" href="">Press kit</a>
                </nav> 
                <nav>
                    <header className="footer-title">Legal</header> 
                    <a className="link link-hover" href="/policies/terms">Terms of service</a> 
                    <a className="link link-hover" href="/policies/privacy">Privacy policy</a> 
                    <a className="link link-hover" href="/policies/cookies">Cookie policy</a>
                    <a className="link link-hover" href="/policies/content">Content policy</a>
                    <a className="link link-hover" href="/policies/community">Community guidlines</a>
                </nav>
            </footer>
            <footer className="footer px-10 py-4 w-screen bg-base-200 text-base-content">
                <aside className="items-center grid-flow-col justify-center">
                    <img src="/svg/logo-white.svg" className="h-8 w-fit" />
                    <div className="flex flex-col ml-2 justify-center">
                        <div className="flex justify-start -ml-2 items-center gap-2">
                            <StatusPageEmbed />
                        </div>
                        <p>© 2023 Tip LLC. All rights reserved.</p>
                    </div>
                </aside> 
                <nav className="md:place-self-center md:justify-self-end">

                    <div className="grid grid-flow-col w-full gap-4">
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