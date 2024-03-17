"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { useState } from "react";
import { set } from "zod";
import Spinner from "./ui/spinner";
import posthog from "posthog-js";

export default function Hero({ comingSoon }: { comingSoon?: boolean }) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const joinWaitlist = async () => {
        setIsLoading(true);
        try {
            posthog.capture("join_waitlist", {
                email: email
            });

            let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news/enter`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email
                })
            });
            if (req.status === 200) {
                setEmail("");
                toast.success("You have been added to the waitlist");
            } else {
                const data = await req.json();
                toast.error(data.message);
            }
        } catch (e) {
            toast.error("An error occurred");
        }
        setIsLoading(false);
    };

    return (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center px-0 sm:px-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                {comingSoon && <p className="text-lg font-bold text-foreground/60">Coming soon</p>}
                <h1 className="font-serif text-3xl font-extrabold sm:text-6xl">
                    Make money doing what you love
                </h1>
                <p className="text-md max-w-2xl font-serif text-foreground/60 sm:text-xl">
                    tip.dev is a platform for <span className="text-secondary">developers</span> to
                    get tipped from fans of their work. Embed a link anywhere, and get paid from
                    almost everywhere.
                </p>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-4">
                {comingSoon ? (
                    <div className="group flex w-full items-center space-x-1 rounded-full border bg-muted py-2 pl-6 pr-2 text-lg ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
                        <Input
                            className="group border-none bg-transparent p-0  text-lg font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Enter your email"
                            type="email"
                            disabled={isLoading}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            variant="default"
                            className="rounded-full font-bold"
                            onClick={joinWaitlist}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Spinner className="h-4 w-4 fill-primary-foreground text-primary-foreground/20" />
                            ) : (
                                "Join Waitlist"
                            )}
                        </Button>
                    </div>
                ) : (
                    <div className="group flex w-full items-center space-x-1 rounded-full border bg-muted py-2 pl-6 pr-2 text-lg ring-offset-background group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2">
                        <p className="font-bold text-foreground/60">tip.dev/</p>
                        <Input
                            className="group border-none bg-transparent p-0  text-lg font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="you"
                        />
                        <Button variant="default" className="rounded-full font-bold" asChild>
                            <Link href="/auth/signup">Get Started</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
