import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { CoinsIcon, ExternalLinkIcon, HomeIcon, UsersIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";

export default function DashboardSidebar() {
    const active: string = "home";
    return (
        <aside className="fixed left-28 top-[5.5rem] flex h-[87%] w-fit flex-col justify-start py-2">
            <div className="flex h-full min-w-0 max-w-fit flex-col items-center space-y-1">
                <SidebarTab
                    active={active === "home"}
                    icon={<HomeIcon className="h-4 w-4" />}
                    text="Home"
                    link="/dashboard"
                />
                <SidebarTab
                    active={active === "your-page"}
                    icon={<ExternalLinkIcon className="h-4 w-4" />}
                    text="Your Page"
                    link="/"
                />
                <Separator orientation="horizontal" className="bg-accent" />
                <SidebarTab
                    active={active === "tips"}
                    icon={<CoinsIcon className="h-4 w-4" />}
                    text="Tips"
                    link="/dashboard/tips"
                />
                <SidebarTab
                    active={active === "users"}
                    icon={<UsersIcon className="h-4 w-4" />}
                    text="Subscribers"
                    link="/dashboard/users"
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
