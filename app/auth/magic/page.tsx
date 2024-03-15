"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import useAuthStore from "@/stores/auth-store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const router = useRouter();
    const { setToken, setUser, toggleSignedIn } = useAuthStore();

    const [mlToken, setMLToken] = useState<any>("");
    const [email, setEmail] = useState<any>("");
    const [type, setType] = useState<"signin" | "signup" | "">("");
    const [continueTo, setContinueTo] = useState<any>("");
    const [url, setUrl] = useState(new URLSearchParams(location.search));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof location === undefined) return;

        setMLToken(url.get("token"));
        setEmail(url.get("email"));
        setType(url.get("type") === "signup" ? "signup" : "signin");
        setContinueTo(url.get("continue"));

        // if (!token || !email || !type) {
        //     toast.error("Invalid magic link");
        //     setIsLoading(false);
        //     return;
        // }

        async function validateMagicLink() {
            try {
                if (type === "signin") {
                    const req = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
                        token: mlToken,
                        email
                    });

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
                } else if (type === "signup") {
                    const req = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
                        token: mlToken,
                        email
                    });

                    if (req.status !== 200) {
                        toast.error("An error occurred. Please try again later.", {
                            description: req.data
                        });
                    } else {
                        const data = req.data.data;
                        setToken(data.token);
                        toggleSignedIn();

                        toast.success("Validated magic link!");
                        if (continueTo) {
                            router.push(decodeURIComponent(continueTo));
                        } else {
                            router.push("/onboarding/username");
                        }
                    }
                } else {
                    toast.error("Invalid magic link");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again later.");
                setIsLoading(false);
            }
        }

        validateMagicLink();
    }, [mlToken, email, type, continueTo, url, router]);

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
