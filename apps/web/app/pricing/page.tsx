import Navbar from "@/components/navbar";
import PricingCards from "@/components/pricing-cards";
import SmallFooter from "@/components/small-footer";

export default function Page() {
    const comingSoon = true;
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            <Navbar active="pricing" comingSoon={comingSoon} />

            <div className="mt-20 flex h-full w-full flex-1 flex-col items-start justify-center space-y-8 sm:mt-0 md:w-3/4">
                <div className="flex flex-col gap-2">
                    <h1 className="font-serif text-3xl font-black sm:text-4xl">
                        Clear <span className="font-black text-yellow-400">+</span> transparent
                        pricing.
                    </h1>
                    <p className="sm:text-md text-foreground/60 text-sm">
                        tip.dev is free to use, but we also have paid plans for power users.
                    </p>
                </div>

                <PricingCards />
            </div>

            <SmallFooter />
        </main>
    );
}
