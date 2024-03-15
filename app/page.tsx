import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Page() {
    const comingSoon = true;
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-dot-white/[0.2] sm:p-24">
            <Navbar active="home" comingSoon={comingSoon} />
            <Hero comingSoon={comingSoon} />
        </main>
    );
}
