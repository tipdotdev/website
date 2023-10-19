import SEOHead from "@/comps/seohead";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function page() {
    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">

            <SEOHead title="404" />

            <h1 className="text-5xl font-bold font-code">404</h1>
            <p className="text-lg font-medium mb-4 font-code text-white/40">Page not found</p>

            <p className="text-xl font-medium mb-4 text-white">Want this to be your <span className="font-code text-primary">tip.dev</span> ?</p>

            <a href="/onboarding/signup" className="btn btn-primary mt-10 btn-lg">Claim it now!</a>

        </main>
    )
}