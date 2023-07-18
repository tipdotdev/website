import { Inter } from "next/font/google";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'] })

export default function page() {
    const { isLoaded, isSignedIn, user } = useUser();

    // redirect to profile if already completed onboarding
    if (isSignedIn) {
        window.location.href = `/dashboard`
    }

    if (!isSignedIn) {
        <RedirectToSignIn />
    }

    if (!isLoaded) {
        return (
            <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
                <span className="loading loading-spinner"></span>
            </main>
        )
    }

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
            <span className="loading loading-spinner"></span>
        </main>
    )
}