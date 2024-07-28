"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth, useUser } from "@clerk/nextjs";
import {
    ArrowLeftCircleIcon,
    DollarSignIcon,
    MenuIcon,
    SettingsIcon,
    UserIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserDropdown() {
    const router = useRouter();
    const { user } = useUser();
    const { signOut } = useAuth();

    console.log(user);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center justify-center gap-1 rounded-lg border border-muted-foreground/40 p-1 pr-2">
                    <Avatar className="h-6 w-6 rounded-sm">
                        <AvatarImage src={user?.hasImage ? user?.imageUrl : undefined} />
                        <AvatarFallback className="rounded-md">
                            {user?.username?.[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <MenuIcon className="h-4 w-4 text-muted-foreground" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="font-serif text-lg font-bold">
                    Hey, <span className="font-extrabold text-primary">{user?.username}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                    <UserIcon className="h-4 w-4" />
                    Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                    <DollarSignIcon className="h-4 w-4" />
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer gap-2 text-red-500 focus:bg-red-500 focus:text-foreground"
                    onClick={() => {
                        signOut();
                        router.push("/auth/signin");
                    }}
                >
                    <ArrowLeftCircleIcon className="h-4 w-4" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
