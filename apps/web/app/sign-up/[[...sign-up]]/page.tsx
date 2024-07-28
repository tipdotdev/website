"use client";

import SmallFooter from "@/components/small-footer";
import { Progress } from "@/components/ui/progress";
import { SignUp, useAuth } from "@clerk/nextjs";
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
            <Progress value={33} className="absolute top-4 h-2 w-[98%] bg-card sm:w-1/2" />
            <SignUp forceRedirectUrl={"/onboarding/profile"} />
            <SmallFooter />
        </main>
    );
}
