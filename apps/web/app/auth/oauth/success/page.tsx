"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { base64Decode } from "@/lib/crypto";
import useAuthStore from "@/stores/auth-store";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <Content />
        </Suspense>
    );
}

function Content() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setToken, setUser, toggleSignedIn } = useAuthStore();

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [tempToken, setTempToken] = useState("");
    const [continueTo, setContinueTo] = useState("");

    useEffect(() => {
        if (typeof location === undefined) return;

        setTempToken(searchParams.get("token") as string);
        setContinueTo(searchParams.get("continue") as string);

        async function exchangeTokens() {
            if (!tempToken) return;
            try {
                const res = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/temptoken/exchange`,
                    {
                        token: tempToken
                    }
                );

                if (res.status === 200) {
                    const data = res.data.data;

                    setToken(data.token);
                    setUser(data.user);
                    toggleSignedIn();

                    toast.success("Welcome back " + data.user.username || "!");

                    if (continueTo) {
                        router.push(continueTo);
                    } else {
                        router.push("/dashboard");
                    }
                }
            } catch (error) {
                setIsError(true);
                toast.error("An error occurred while trying to exchange tokens");
            } finally {
                setIsLoading(false);
            }
        }

        exchangeTokens();
    }, [
        searchParams,
        tempToken,
        router,
        setToken,
        setUser,
        toggleSignedIn,
        setIsLoading,
        continueTo
    ]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4  sm:p-24">
            {isLoading ? (
                <Spinner className="h-4 w-4 fill-foreground text-foreground/20" />
            ) : (
                <>
                    {isError && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Error exchanging tokens</CardTitle>
                                <CardDescription>
                                    Please request go back to sign in and try again.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant={"default"} className="w-full">
                                    <Link href="/auth/signin">Back to sign in</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </main>
    );
}
