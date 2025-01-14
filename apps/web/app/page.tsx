import { Badge } from "@/components/ui/badge";
import { Particles } from "@/components/ui/particles";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col items-center">
            <main className="z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <Badge className="mb-8 bg-purple-500/20 text-purple-300 hover:bg-purple-500/20">
                            Coming Soon
                        </Badge>
                        <h1 className="font-serif text-3xl font-extrabold sm:text-5xl">
                            Make money doing what you love
                        </h1>
                        <p className="max-w-xl font-serif text-sm text-muted-foreground sm:text-lg">
                            tip.dev is a platform for{" "}
                            <span className="text-primary">developers</span> to get paid by fans of
                            their work. Embed a link anywhere and get paid from almost everywhere.
                        </p>
                    </div>
                </div>
            </main>
            <Particles
                className="absolute inset-0"
                quantity={500}
                ease={80}
                color={"#ffffff"}
                refresh
            />
        </div>
    );
}
