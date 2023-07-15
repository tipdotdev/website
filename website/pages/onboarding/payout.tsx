import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function page() {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isSignedIn) {
        <RedirectToSignIn />
    }

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
            <h1 className="text-4xl font-bold mt-12">Select your payout preference</h1>
        </main>
    )

}