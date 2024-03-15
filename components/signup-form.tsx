"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { MailIcon, SparklesIcon } from "lucide-react";
import OauthButtons from "./oauth-buttons";
import { Separator } from "./ui/separator";
import Spinner from "./ui/spinner";
import axios from "axios";
import { toast } from "sonner";

const signupFormSchema = z.object({
    email: z.string().email()
});

export default function SignupForm() {
    const signupForm = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            email: ""
        }
    });

    const [showEmailOption, setShowEmailOption] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [magicLinkSent, setMagicLinkSent] = useState(false);

    async function onSignupSubmit(values: z.infer<typeof signupFormSchema>) {
        setIsLoading(true);

        try {
            const req = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
                {
                    email: values.email,
                    continue: "/onboarding/username"
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (req.status !== 200) {
                toast.error("An error occurred. Please try again later.", {
                    description: req.data
                });
            } else {
                if (req.data.message !== "magic link sent") {
                    toast.error("An error occurred. Please try again later.", {
                        description: req.data
                    });
                } else {
                    setMagicLinkSent(true);
                    toast.success("Magic link sent. Please check your email.");
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        }

        setIsLoading(false);
    }

    return (
        <Card className="w-full shadow-none sm:max-w-lg">
            <CardHeader>
                {magicLinkSent ? (
                    <>
                        <CardTitle className="text-2xl">Magic Link Sent</CardTitle>
                        <CardDescription>
                            Please check your{" "}
                            <a
                                target="_blank"
                                href={"https://" + signupForm.getValues("email").split("@")[1]}
                                className="cursor-pointer underline hover:text-foreground"
                            >
                                email
                            </a>
                            . If you don&apos;t see it, check your spam folder. If you don&apos;t
                            receive an email, please try again.
                        </CardDescription>
                    </>
                ) : (
                    <>
                        <CardTitle className="text-2xl">Welcome to tip.dev!</CardTitle>
                        <CardDescription>Please sign up to continue.</CardDescription>
                    </>
                )}
            </CardHeader>
            {!magicLinkSent && (
                <CardContent>
                    <div className="flex w-full flex-col items-center space-y-4">
                        {!isLoading && (
                            <>
                                <OauthButtons />
                                <Separator />
                            </>
                        )}
                        <Button
                            className={`w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/80
                            ${showEmailOption ? "hidden" : ""}
                        `}
                            onClick={() => setShowEmailOption(true)}
                        >
                            <MailIcon className="h-4 w-4" />
                            Continue with Email
                        </Button>
                        {showEmailOption && (
                            <Form {...signupForm}>
                                <form
                                    onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                                    className="w-full space-y-4"
                                >
                                    <div className="space-y-2">
                                        <FormField
                                            control={signupForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Email"
                                                            {...field}
                                                            disabled={isLoading}
                                                            className="ring-offset-card"
                                                            type="email"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full gap-2"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Spinner className="fill-primary-foreground text-primary-foreground/20" />
                                        ) : (
                                            <SparklesIcon className="h-4 w-4 fill-primary-foreground" />
                                        )}
                                        Send magic link
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </div>
                </CardContent>
            )}
            {!magicLinkSent && (
                <CardFooter>
                    <div className="flex flex-col items-start space-y-2">
                        <CardDescription>
                            Already have an account?{" "}
                            <Link href="/auth/signin" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </CardDescription>
                    </div>
                </CardFooter>
            )}
        </Card>
    );
}