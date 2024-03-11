import OnboardingForm from "@/components/onboarding-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "tip.dev onboarding"
};

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-24">
            <Progress value={33} className="absolute top-4 h-2 w-[98%] bg-card sm:w-1/2" />
            <Card className="w-full border-0 bg-transparent p-0 shadow-none sm:w-1/2">
                <CardHeader>
                    <CardTitle className="font-serif text-4xl font-extrabold">
                        Welcome to tip.dev!
                    </CardTitle>
                    <CardDescription>
                        First, pick a username, this is how people will find you on tip.dev. For
                        example,{" "}
                        <a
                            href="/dickey"
                            target="_blank"
                            className="hover:text-foreground hover:underline"
                        >
                            tip.dev/dickey
                        </a>
                        .
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OnboardingForm type="username" />
                </CardContent>
            </Card>
        </main>
    );
}
