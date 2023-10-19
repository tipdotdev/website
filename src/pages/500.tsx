import SEOHead from "@/comps/seohead";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function page() {
    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">

            <SEOHead title="500" />

            <h1 className="text-5xl font-bold font-code">500</h1>
            <p className="text-lg font-medium mb-4 font-code text-white/40">Client side error.</p>
            
            <a href="/" className="btn btn-primary mt-10 ">Go back home</a>

        </main>
    )
}