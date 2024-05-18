import DiscordIcon from "@/public/icons/discord-icon.svg";
import TwitterIcon from "@/public/icons/twitter-icon.svg";
import GitHubIcon from "@/public/icons/github-icon.svg";
import Link from "next/link";

export default function SmallFooter() {
    return (
        <footer className="absolute bottom-0 w-screen bg-transparent py-2">
            <div className="flex w-full justify-between px-4">
                <div>
                    <p className="text-muted-foreground/80 text-sm">
                        &copy; {new Date().getFullYear()} tip.dev
                    </p>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <Link href="/discord" target="_blank" aria-label="discord link">
                        <DiscordIcon className="fill-muted-foreground/80 hover:fill-muted-foreground/50 h-5 w-5 transition-all duration-200 ease-in-out" />
                    </Link>
                    <Link
                        href="https://twitter.com/tipdotdev"
                        target="_blank"
                        aria-label="twitter link"
                    >
                        <TwitterIcon className="fill-muted-foreground/80 hover:fill-muted-foreground/50 h-4 w-4 transition-all duration-200 ease-in-out" />
                    </Link>
                    <Link
                        href="https://github.com/tipdotdev"
                        target="_blank"
                        aria-label="github link"
                    >
                        <GitHubIcon className="fill-muted-foreground/80 hover:fill-muted-foreground/50 h-4 w-4 transition-all duration-200 ease-in-out" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
