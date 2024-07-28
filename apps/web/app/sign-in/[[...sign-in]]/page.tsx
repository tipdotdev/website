"use client";

import SmallFooter from "@/components/small-footer";
import { SignIn, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const { isSignedIn, isLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isSignedIn && isLoaded) {
            router.push("/dashboard");
        }
    }, [isSignedIn, router, isLoaded]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            <SignIn forceRedirectUrl={"/dashboard"} />
            <SmallFooter />
        </main>
    );
}
