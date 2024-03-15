"use client";

import useAuthStore from "@/stores/auth-store";
import Link from "next/link";
import ms from "ms";

export default function Page() {
    const { user } = useAuthStore();

    return (
        <main className="flex w-full flex-1 pl-44">
            <div className="grid w-full grid-cols-4 gap-4">
                <div className="col-span-4 flex h-fit items-center justify-between rounded-md border bg-muted p-4">
                    <div className="flex flex-col items-start justify-center">
                        <h1 className="font-serif text-2xl font-black text-foreground">
                            Hey, <span className="text-primary">{user?.username}</span>
                        </h1>
                        <div className="flex flex-row items-center gap-1">
                            <div className="h-3 w-3 animate-pulse rounded-full bg-green-500 font-mono"></div>
                            <Link
                                className="text-sm font-medium text-muted-foreground hover:underline"
                                href={"/" + user?.username}
                            >
                                tip.dev/{user?.username}
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <p className="text-xs font-medium text-muted-foreground">
                            Joined{" "}
                            {ms(
                                user?.created_at
                                    ? Date.now() - new Date(user?.created_at).getTime()
                                    : 0,
                                {
                                    long: false
                                }
                            )}{" "}
                            ago
                        </p>
                        <p className="text-xs font-medium text-muted-foreground">
                            Updated{" "}
                            {ms(
                                user?.updated_at
                                    ? Date.now() - new Date(user?.updated_at).getTime()
                                    : 0,
                                {
                                    long: false
                                }
                            )}{" "}
                            ago
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
