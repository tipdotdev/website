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
            <MagicAuth />
        </Suspense>
    );
}

function MagicAuth() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setToken, setUser, toggleSignedIn } = useAuthStore();

    const [mlToken, setMLToken] = useState<any>("");
    const [email, setEmail] = useState<any>("");
    const [continueTo, setContinueTo] = useState<any>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof location === undefined) return;

        const decodedUrl = base64Decode(searchParams.get("ec") as string);
        const parts = decodedUrl.split("&");

        setEmail(parts[0].split("=")[1]);
        setMLToken(parts[1].split("=")[1]);
        setContinueTo(parts[2].split("=")[1]);

        async function validateMagicLink() {
            try {
                const req = await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/magiclink/validate`,
                    {
                        token: mlToken,
                        email
                    }
                );

                if (req.status !== 200) {
                    toast.error("An error occurred. Please try again later.", {
                        description: req.data
                    });
                } else {
                    const data = req.data.data;
                    setToken(data.token);
                    setUser(data.user);
                    toggleSignedIn();

                    toast.success("Validated magic link!");
                    if (continueTo) {
                        router.push(decodeURIComponent(continueTo));
                    } else {
                        router.push("/dashboard");
                    }
                }
            } catch (error) {
                toast.error("An error occurred. Please try again later.");
                setIsLoading(false);
            }
        }

        if (mlToken && email) {
            validateMagicLink();
        }
    }, [mlToken, email, continueTo, searchParams, router, setToken, setUser, toggleSignedIn]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4  sm:p-24">
            {isLoading ? (
                <Spinner className="h-4 w-4 fill-foreground text-foreground/20" />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Invalid magic link</CardTitle>
                        <CardDescription>Please request a new magic link.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild variant={"default"} className="w-full">
                            <Link href="/auth/signin">Back to sign in</Link>
                        </Button>
                    </CardContent>
                </Card>
            )}
        </main>
    );
}
