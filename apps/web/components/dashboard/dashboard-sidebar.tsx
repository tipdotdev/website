"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
    BarChart2Icon,
    BookUserIcon,
    Code2Icon,
    CoinsIcon,
    DollarSignIcon,
    HistoryIcon,
    HomeIcon,
    SettingsIcon,
    UserIcon,
    UsersIcon
} from "lucide-react";
import { Separator } from "../ui/separator";
import useDashboardStore from "@/stores/dashboard-store";

export default function DashboardSidebar() {
    const { activeTab } = useDashboardStore();
    return (
        <aside className="fixed left-28 top-[5.5rem] flex h-[87%] w-fit flex-col justify-start py-2">
            <div className="flex h-full min-w-0 max-w-fit flex-col items-center space-y-1">
                <SidebarTab
                    active={activeTab === "home"}
                    icon={<HomeIcon className="h-4 w-4" />}
                    text="Home"
                    link="/dashboard"
                />
                <SidebarTab
                    active={activeTab === "profile"}
                    icon={<UserIcon className="h-4 w-4" />}
                    text="Profile"
                    link="/dashboard/profile"
                />
                <Separator orientation="horizontal" className="bg-accent" />
                <SidebarTab
                    active={activeTab === "tips"}
                    icon={<CoinsIcon className="h-4 w-4" />}
                    text="Tips"
                    link="/dashboard/tips"
                />
                <SidebarTab
                    active={activeTab === "subscribers"}
                    icon={<UsersIcon className="h-4 w-4" />}
                    text="Subscribers"
                    link="/dashboard/subscribers"
                />
                <SidebarTab
                    active={activeTab === "analytics"}
                    icon={<BarChart2Icon className="h-4 w-4" />}
                    text="Analytics"
                    link="/dashboard/analytics"
                />
                <SidebarTab
                    active={activeTab === "history"}
                    icon={<HistoryIcon className="h-4 w-4" />}
                    text="History"
                    link="/dashboard/history"
                />
                <SidebarTab
                    active={activeTab === "followers"}
                    icon={<BookUserIcon className="h-4 w-4" />}
                    text="Followers"
                    link="/dashboard/followers"
                />
                <Separator orientation="horizontal" className="bg-accent" />
                <SidebarTab
                    active={activeTab === "payout"}
                    icon={<DollarSignIcon className="h-4 w-4" />}
                    text="Payout"
                    link="/dashboard/settings/payout"
                />
                <SidebarTab
                    active={activeTab === "integrations"}
                    icon={<Code2Icon className="h-4 w-4" />}
                    text="Integrations"
                    link="/dashboard/settings/integrations"
                />
                <SidebarTab
                    active={activeTab === "settings"}
                    icon={<SettingsIcon className="h-4 w-4" />}
                    text="Settings"
                    link="/dashboard/settings"
                />
            </div>
        </aside>
    );
}

function SidebarTab({
    active,
    icon,
    text,
    link,
    target
}: {
    active: boolean;
    icon: any;
    text: string;
    link: string;
    target?: string;
}) {
    return (
        <Button
            variant={active ? "default" : "ghost"}
            size={"sm"}
            className="w-full justify-start"
            asChild
        >
            <Link href={link} className="flex items-center gap-2">
                {icon}
                {text}
            </Link>
        </Button>
    );
}
