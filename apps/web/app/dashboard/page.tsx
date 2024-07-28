"use client";

import {
    DashboardContainer,
    DashboardGrid,
    DashboardGridItem
} from "@/components/dashboard/dashboard-layout";
import RangePicker from "@/components/dashboard/range-picker";
import StatTrend from "@/components/dashboard/stat-trend";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useDashboardStore from "@/stores/dashboard-store";
import { useUser } from "@clerk/nextjs";
import ms from "ms";
import Link from "next/link";
import { useEffect } from "react";

export default function Page() {
    const { user } = useUser();

    const { setActiveTab } = useDashboardStore();

    useEffect(() => {
        setActiveTab("home");
    }, []);

    return (
        <DashboardContainer>
            <DashboardGrid>
                <DashboardGridItem>
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="text-foreground font-serif text-2xl font-black">
                            Hey, <span className="text-primary">{user?.username}</span>
                        </h1>
                        <div className="flex flex-row items-center gap-1">
                            <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 font-mono"></div>
                            <Link
                                className="text-muted-foreground text-sm font-medium hover:underline"
                                href={"/" + user?.username}
                            >
                                tip.dev/{user?.username}
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <p className="text-muted-foreground text-xs font-medium">
                            Joined{" "}
                            {ms(
                                user?.createdAt
                                    ? Date.now() - new Date(user?.createdAt).getTime()
                                    : 0,
                                {
                                    long: false
                                }
                            )}{" "}
                            ago
                        </p>
                        <p className="text-muted-foreground text-xs font-medium">
                            Updated{" "}
                            {ms(
                                user?.updatedAt
                                    ? Date.now() - new Date(user?.updatedAt).getTime()
                                    : 0,
                                {
                                    long: false
                                }
                            )}{" "}
                            ago
                        </p>
                    </div>
                </DashboardGridItem>

                <DashboardGridItem className="col-span-2">
                    <div className="flex w-full flex-col items-start justify-center space-y-6">
                        <div className="flex w-full flex-row items-start justify-between">
                            <div className="flex flex-row items-start space-x-2">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="font-serif text-2xl font-black">Earnings</p>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        After fees and such
                                    </p>
                                </div>
                            </div>
                            <RangePicker />
                        </div>
                        <div className="flex w-full flex-row items-center space-x-2">
                            <h1 className="font-serif text-4xl font-black">$2,401.92</h1>
                            <StatTrend dir="up" val={32} />
                        </div>

                        <div className="flex w-full flex-row flex-wrap items-center justify-start space-x-4">
                            <Tooltip>
                                <TooltipTrigger className="flex flex-row items-center gap-1">
                                    <div className="h-4 w-4 rounded bg-blue-500/50"></div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        $1,248.12
                                    </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Income from tips</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger className="flex flex-row items-center gap-1">
                                    <div className="h-4 w-4 rounded bg-red-500/50"></div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        $836.50
                                    </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Income from subscribers</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger className="flex flex-row items-center gap-1">
                                    <div className="h-4 w-4 rounded bg-green-500/50"></div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        $237.30
                                    </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Income from wishlists</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger className="flex flex-row items-center gap-1">
                                    <div className="h-4 w-4 rounded bg-yellow-500/50"></div>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        $80.00
                                    </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Income from commissions</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </DashboardGridItem>
                <DashboardGridItem className="col-span-2">
                    <div className="flex w-full flex-col items-start justify-center space-y-6">
                        <div className="flex w-full flex-row items-start justify-between">
                            <div className="flex flex-row items-start space-x-2">
                                <div className="flex flex-col items-start justify-center">
                                    <p className="font-serif text-2xl font-black">Supporters</p>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        Annonymous and registered users
                                    </p>
                                </div>
                            </div>
                            <RangePicker />
                        </div>
                        <div className="flex w-full flex-row items-center space-x-2">
                            <h1 className="font-serif text-4xl font-black">273</h1>
                            <StatTrend dir="down" val={2.1} />
                        </div>

                        <div className="flex w-full flex-row flex-wrap items-center justify-start space-x-4">
                            <Tooltip>
                                <TooltipTrigger className="flex flex-row items-center gap-1">
                                    <div className="h-4 w-4 rounded bg-orange-500/50"></div>
                                    <p className="text-muted-foreground text-sm font-medium">133</p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>New supporters</p>
                                </TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger className="flex flex-row items-center gap-1">
                                    <div className="h-4 w-4 rounded bg-purple-500/50"></div>
                                    <p className="text-muted-foreground text-sm font-medium">140</p>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Recurring supporters</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </div>
                </DashboardGridItem>

                <DashboardGridItem className="col-span-1">
                    <div className="flex w-full flex-col items-start justify-center space-y-2">
                        <div className="flex w-full flex-row items-start justify-between">
                            <p className="font-serif text-lg font-black">Subscribers</p>
                        </div>
                        <div className="flex w-full flex-row items-center space-x-2">
                            <h1 className="font-serif text-2xl font-black">46</h1>
                            <StatTrend dir="down" />
                        </div>
                    </div>
                </DashboardGridItem>
                <DashboardGridItem className="col-span-1">
                    <div className="flex w-full flex-col items-start justify-center space-y-2">
                        <div className="flex w-full flex-row items-start justify-between">
                            <p className="font-serif text-lg font-black">Followers</p>
                        </div>
                        <div className="flex w-full flex-row items-center space-x-2">
                            <h1 className="font-serif text-2xl font-black">439</h1>
                            <StatTrend dir="up" />
                        </div>
                    </div>
                </DashboardGridItem>
                <DashboardGridItem className="col-span-1">
                    <div className="flex w-full flex-col items-start justify-center space-y-2">
                        <div className="flex w-full flex-row items-start justify-between">
                            <p className="font-serif text-lg font-black">Page Views</p>
                        </div>
                        <div className="flex w-full flex-row items-center space-x-2">
                            <h1 className="font-serif text-2xl font-black">26,250</h1>
                            <StatTrend dir="up" />
                        </div>
                    </div>
                </DashboardGridItem>
                <DashboardGridItem className="col-span-1">
                    <div className="flex w-full flex-col items-start justify-center space-y-2">
                        <div className="flex w-full flex-row items-start justify-between">
                            <p className="font-serif text-lg font-black">Conversion Rate</p>
                        </div>
                        <div className="flex w-full flex-row items-center space-x-2">
                            <h1 className="font-serif text-2xl font-black">1.04%</h1>
                            <StatTrend dir="down" />
                        </div>
                    </div>
                </DashboardGridItem>

                <DashboardGridItem>
                    <div className="flex w-full flex-col items-start justify-center space-y-2">
                        <div className="flex w-full flex-col items-start">
                            <p className="font-serif text-xl font-black">Recent Events</p>
                            <p className="text-muted-foreground text-sm font-medium">
                                5 most recent events
                            </p>
                        </div>
                        <div className="flex w-full flex-col items-start justify-center space-y-2">
                            <div className="bg-accent/20 flex w-full flex-row items-center justify-between rounded border px-3 py-2">
                                <div className="flex flex-col items-start justify-center gap-1">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        <Link href="/" className="hover:underline">
                                            haste
                                        </Link>{" "}
                                        gave you
                                    </p>
                                    <p className="font-serif text-2xl font-black ">$5.00</p>
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-blue-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                Tip
                                            </p>
                                        </div>
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-orange-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                First time
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        2 hours ago
                                    </p>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        pi_a12d0-13lfp-aw3fo-103fo
                                    </p>
                                </div>
                            </div>

                            <div className="bg-accent/20 flex w-full flex-row items-center justify-between rounded border px-3 py-2">
                                <div className="flex flex-col items-start justify-center gap-1">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        Someone gave you
                                    </p>
                                    <p className="font-serif text-2xl font-black ">$6.90</p>
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-blue-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                Tip
                                            </p>
                                        </div>
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-orange-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                First time
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        3 hours ago
                                    </p>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        pi_pa10c-ddfoq-50pxf-30dp3
                                    </p>
                                </div>
                            </div>

                            <div className="bg-accent/20 flex w-full flex-row items-center justify-between rounded border px-3 py-2">
                                <div className="flex flex-col items-start justify-center gap-1">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        <Link href="/" className="hover:underline">
                                            _fab
                                        </Link>{" "}
                                        gave you
                                    </p>
                                    <p className="font-serif text-2xl font-black ">$12.00</p>
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-red-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                Subscription
                                            </p>
                                        </div>
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-purple-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                Recurring
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        5 hours ago
                                    </p>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        pi_pqo82-apq40-fo504-301pm
                                    </p>
                                </div>
                            </div>

                            <div className="bg-accent/20 flex w-full flex-row items-center justify-between rounded border px-3 py-2">
                                <div className="flex flex-col items-start justify-center gap-1">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        <Link href="/" className="hover:underline">
                                            pepito
                                        </Link>{" "}
                                        gave you
                                    </p>
                                    <p className="font-serif text-2xl font-black ">$2.00</p>
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-green-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                Wishlist
                                            </p>
                                        </div>
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-purple-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                Recurring
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        6 hours ago
                                    </p>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        pi_tuc91-fhgc9-157sp-ewal4
                                    </p>
                                </div>
                            </div>

                            <div className="bg-accent/20 flex w-full flex-row items-center justify-between rounded border px-3 py-2">
                                <div className="flex flex-col items-start justify-center gap-1">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        <Link href="/" className="hover:underline">
                                            george
                                        </Link>{" "}
                                        gave you
                                    </p>
                                    <p className="font-serif text-2xl font-black ">$10.00</p>
                                    <div className="flex flex-row items-center gap-4">
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-blue-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                Tip
                                            </p>
                                        </div>
                                        <div className="flex flex-row items-center gap-1">
                                            <div className="h-4 w-4 rounded bg-purple-500/50"></div>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                Recurring
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end justify-center">
                                    <p className="text-muted-foreground text-sm font-medium">
                                        6 hours ago
                                    </p>
                                    <p className="text-muted-foreground text-sm font-medium">
                                        pi_fpal1-10dpc-gpqac-dpa31
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full" variant="ghost" asChild>
                            <Link href="/dashboard/history">View all events</Link>
                        </Button>
                    </div>
                </DashboardGridItem>
            </DashboardGrid>
        </DashboardContainer>
    );
}
