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
            <Progress value={100} className="absolute top-4 h-2 w-[98%] bg-card sm:w-1/2" />
            <Card className="w-full border-0 bg-transparent p-0 shadow-none sm:w-1/2">
                <CardHeader>
                    <CardTitle className="font-serif text-4xl font-extrabold">
                        Time for the money money money!
                    </CardTitle>
                    <CardDescription>
                        Last thing we need is how you want to get paid. We are always working on
                        more options, if you don&apos;t see your preferred method, let us know!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OnboardingForm type="payout" />
                </CardContent>
            </Card>
        </main>
    );
}
