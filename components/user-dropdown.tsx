"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowLeftCircleIcon, DollarSignIcon, SettingsIcon, UserIcon } from "lucide-react";
import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
    const router = useRouter();
    const { signout, user } = useAuthStore.getState();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 rounded-md">
                    <AvatarImage src={user?.pictures.avatar} />
                    <AvatarFallback className="rounded-md">TD</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-24">
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
                        signout();
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
