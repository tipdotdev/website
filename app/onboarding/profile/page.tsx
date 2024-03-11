import OnboardingForm from "@/components/onboarding-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "tip.dev onboarding"
};

export default function Page() {
    const username = "dickey";
    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-24">
            <Progress value={66} className="absolute top-4 h-2 w-[98%] bg-card sm:w-1/2" />
            <Card className="w-full border-0 bg-transparent p-0 shadow-none sm:w-1/2">
                <CardHeader>
                    <CardTitle className="font-serif text-4xl font-extrabold">
                        Hey {username}, let&apos;s set up your profile!
                    </CardTitle>
                    <CardDescription>
                        Here is where you can customize what people see and how it looks! Get
                        creative, and have fun. You can always change it later.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <OnboardingForm type="profile" />
                </CardContent>
            </Card>
        </main>
    );
}
