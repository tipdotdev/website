import { FaDiscord, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer(props:any) {
    return (
        <>
            <footer className="footer p-10 bg-base-200 text-base-content w-screen">
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
                    <a className="link link-hover" href="/contact">Contact us</a> 
                    <a className="link link-hover" href="https://docs.tip.dev">API Documentation</a> 
                    <a className="link link-hover" href="https://discord.gg/DsxygKZe54">Discord server</a> 
                    <a className="link link-hover" href="/blog">Blog</a> 
                </nav> 
                <nav>
                    <header className="footer-title">Company</header> 
                    <a className="link link-hover" href="/company/about">About us</a> 
                    <a className="link link-hover" href="/blog">Blog</a>
                    <a className="link link-hover" href="/contact">Contact</a> 
                    <a className="link link-hover" href="/company/jobs">Jobs</a> 
                    <a className="link link-hover" href="/company/press-kit">Press kit</a>
                </nav> 
                <nav>
                    <header className="footer-title">Legal</header> 
                    <a className="link link-hover" href="/policies/terms">Terms of service</a> 
                    <a className="link link-hover" href="/policies/privacy">Privacy policy</a> 
                    <a className="link link-hover" href="/policies/cookies">Cookie policy</a>
                    <a className="link link-hover" href="/policies/content">Content policy</a>
                    <a className="link link-hover" href="/policies/cookies">Community guidlines</a>
                </nav>
            </footer>
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
                            href="https://discord.gg/DsxygKZe54" target="_blank"
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