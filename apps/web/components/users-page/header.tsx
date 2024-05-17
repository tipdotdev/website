"use client";

import type { UserType } from "@/types/user-type";
import Image from "next/image";
import { Button } from "../ui/button";
import { ShieldQuestionIcon } from "lucide-react";
import useAuthStore from "@/stores/auth-store";
import Link from "next/link";

export default function UserPageHeader({ user }: { user: UserType }) {
    const { user: me } = useAuthStore();
    const isMe = me?.user_id === user.user_id;

    return (
        <div className="full flex w-full flex-col items-center">
            <img
                src={user.pictures.banner}
                className="aspect-banner w-full rounded-xl object-cover object-center"
            />
            <div className="-mt-4 flex w-full items-center justify-between gap-4">
                <div className="ml-4 flex items-center gap-4">
                    <Image
                        src={user.pictures.avatar}
                        alt="avatar"
                        className="h-28 w-28 rounded-full border-4"
                        width={112}
                        height={112}
                    />
                    <div>
                        <h1 className="font-serif text-3xl font-bold">{user.username}</h1>
                        <p className="text-foreground/60 text-sm">tip.dev/{user.username}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {isMe ? (
                        <Button
                            asChild
                            className="bg-muted text-foreground hover:bg-muted/70 text-md px-12 font-serif"
                        >
                            <Link href="/dashboard/profile">Edit Profile</Link>
                        </Button>
                    ) : (
                        <Button className="bg-muted text-foreground hover:bg-muted/70 text-md px-12 font-serif">
                            Follow
                        </Button>
                    )}

                    {!isMe && (
                        <Button variant={"ghost"}>
                            <ShieldQuestionIcon className="text-foreground/80 h-6 w-6" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
