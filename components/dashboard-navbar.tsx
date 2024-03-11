import Image from "next/image";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export default function DashboardNavbar() {
    return (
        <nav className="fixed top-1 flex w-[85%] items-center justify-between space-x-12 rounded-lg px-[0.3rem] py-[0.3rem] font-serif sm:top-3 ">
            <div className="ml-1 flex items-center space-x-2">
                <Link href="/dashboard">
                    <Image src="/images/svg/logo.svg" alt="tip.dev" width={32} height={4} />
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                <Button
                    variant={"default"}
                    size="sm"
                    className="h-fit py-[0.4rem] font-medium"
                    asChild
                >
                    <Link href="/pricing">Upgrade</Link>
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="h-8 w-8 rounded-md">
                            <AvatarImage src="https://dickey.gg/me.png" />
                            <AvatarFallback className="rounded-md">CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
