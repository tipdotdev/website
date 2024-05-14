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
    const searchParams = useSearchParams();

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (typeof location === undefined) return;

        setErrorMessage(decodeURIComponent(searchParams.get("error") as string));
    }, [searchParams]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4  sm:p-24">
            <Card>
                <CardHeader>
                    <CardTitle>{errorMessage}</CardTitle>
                    <CardDescription>Please go back to sign in and try again.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild variant={"default"} className="w-full">
                        <Link href="/auth/signin">Back to sign in</Link>
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
