import DiscordIcon from "@/public/icons/discord-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

type Paths = "home" | "pricing" | "blog" | "signin" | "docs" | "";

export default function Navbar({
    active = "",
    comingSoon
}: {
    active?: Paths;
    comingSoon?: boolean;
}) {
    const isActive = (path: Paths) => {
        return active === path ? "text-foreground" : "text-foreground/60";
    };

    return (
        <nav className="bg-muted fixed top-1 flex w-[98%] items-center justify-between space-x-12 rounded-lg border px-[0.3rem] py-[0.3rem] font-serif sm:top-3 sm:w-1/2">
            <div className="ml-1 flex items-center space-x-2">
                <Link href="/" className="flex flex-row items-center gap-2">
                    <Image src="/images/svg/logo.svg" alt="tip.dev" width={32} height={4} />
                    <p className="text-md text-foreground/60 font-bold">tip.dev</p>
                </Link>
            </div>
            <div className="hidden items-center space-x-4 sm:flex">
                <Link href="/pricing">
                    <p
                        className={`text-md hover:text-foreground font-medium transition-all duration-200 ease-in-out
                            ${isActive("pricing")}
                    `}
                    >
                        Pricing
                    </p>
                </Link>
                <Link href="/blog">
                    <p
                        className={`text-md hover:text-foreground font-medium transition-all duration-200 ease-in-out
                        ${isActive("blog")}
                    `}
                    >
                        Blog
                    </p>
                </Link>
                <Link href="https://docs.tip.dev">
                    <p
                        className={`text-md text-foreground/60 hover:text-foreground font-medium transition-all duration-200 ease-in-out
                            ${isActive("docs")}
                            `}
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
                        <Link href="/sign-in">
                            <p
                                className={`text-md hover:text-foreground font-medium transition-all duration-200 ease-in-out
                                ${isActive("signin")}
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
                            <Link href="/sign-up">Sign Up</Link>
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
}
