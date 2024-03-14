import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import DiscordIcon from "@/public/icons/discord-icon.svg";

export default function Navbar({
    active = "",
    comingSoon
}: {
    active?: "home" | "pricing" | "blog" | "signin" | "";
    comingSoon?: boolean;
}) {
    return (
        <nav className="fixed top-1 flex w-[98%] items-center justify-between space-x-12 rounded-lg border bg-muted px-[0.3rem] py-[0.3rem] font-serif sm:top-3 sm:w-1/2">
            <div className="ml-1 flex items-center space-x-2">
                <Link href="/">
                    <Image src="/images/svg/logo.svg" alt="tip.dev" width={32} height={4} />
                </Link>
                <p className="text-md font-bold text-foreground/60">tip.dev</p>
            </div>
            <div className="hidden items-center space-x-4 sm:flex">
                <Link href="/pricing">
                    <p
                        className={`text-md font-medium transition-all duration-200 ease-in-out hover:text-foreground
                        ${active === "pricing" ? "text-foreground" : "text-foreground/60"}
                    `}
                    >
                        Pricing
                    </p>
                </Link>
                <Link href="/blog">
                    <p
                        className={`text-md font-medium transition-all duration-200 ease-in-out hover:text-foreground
                        ${active === "blog" ? "text-foreground" : "text-foreground/60"}
                    `}
                    >
                        Blog
                    </p>
                </Link>
                <Link href="https://docs.tip.dev">
                    <p
                        className={`text-md font-medium text-foreground/60 transition-all duration-200 ease-in-out hover:text-foreground`}
                    >
                        Docs
                    </p>
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                {comingSoon ? (
                    <>
                        <Button
                            variant={"default"}
                            size="sm"
                            className="h-fit space-x-2 py-[0.4rem] font-medium"
                            asChild
                        >
                            <Link href="/discord" className="space-x-2">
                                <DiscordIcon className="mr-2 h-4 w-4" />
                                Join our Discord
                            </Link>
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/auth/signin">
                            <p
                                className={`text-md font-medium transition-all duration-200 ease-in-out hover:text-foreground
                                ${active === "signin" ? "text-foreground" : "text-foreground/60"}
                                `}
                            >
                                Sign In
                            </p>
                        </Link>
                        <Button
                            variant={"default"}
                            size="sm"
                            className="h-fit py-[0.4rem] font-medium"
                            asChild
                        >
                            <Link href="/auth/signup">Sign Up</Link>
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}
