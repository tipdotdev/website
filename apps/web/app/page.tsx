import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import SmallFooter from "@/components/small-footer";

export default function Page() {
    const comingSoon = true;
    return (
        <main className="bg-dot-white/[0.2] flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            <Navbar active="home" comingSoon={comingSoon} />
            <Hero comingSoon={comingSoon} />
            <SmallFooter />
        </main>
    );
}
