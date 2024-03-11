"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CheckIcon, XIcon } from "lucide-react";
import Spinner from "./ui/spinner";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import GitHubIcon from "@/public/icons/github-icon.svg";
import TwitterIcon from "@/public/icons/twitter-icon.svg";
import LinkedInIcon from "@/public/icons/linkedin-icon.svg";
import InstagramIcon from "@/public/icons/instagram-icon.svg";
import TwitchIcon from "@/public/icons/twitch-icon.svg";
import YouTubeIcon from "@/public/icons/youtube-icon.svg";
import StripeIcon from "@/public/icons/stripe-icon.svg";
import PayPalIcon from "@/public/icons/paypal-icon.svg";
import BankIcon from "@/public/icons/bank-icon.svg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function OnboardingForm({ type }: { type: "username" | "profile" | "payout" }) {
    if (type === "username") {
        return <UsernameForm />;
    } else if (type === "profile") {
        return <ProfileForm />;
    } else if (type === "payout") {
        return <PayoutForm />;
    }

    return null;
}

const usernameFormSchema = z.object({
    username: z
        .string()
        .min(2, "Username is too short")
        .max(20, "Username is too long")
        .toLowerCase()
        .trim()
        // get rid of whitespace
        .regex(/^[a-z0-9_]+$/)
});

function UsernameForm() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [isAvailableLoading, setIsAvailableLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const usernameForm = useForm<z.infer<typeof usernameFormSchema>>({
        resolver: zodResolver(usernameFormSchema),
        defaultValues: {
            username: ""
        }
    });

    function onSubmit(values: z.infer<typeof usernameFormSchema>) {
        console.log(values);
    }

    // when the user types in the username input, check if it's available
    useEffect(() => {
        if (usernameForm.formState.isDirty) {
            console.log(usernameForm.getValues("username"));
            setIsAvailableLoading(true);
            setTimeout(() => {
                setIsAvailableLoading(false);
                setIsAvailable(Math.random() > 0.5);
            }, 1000);
        }
    }, [usernameForm.formState.isDirty, usernameForm.getValues("username")]);

    return (
        <Form {...usernameForm}>
            <form onSubmit={usernameForm.handleSubmit(onSubmit)} className="w-full space-y-8">
                <div className="space-y-2">
                    <FormField
                        control={usernameForm.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="group flex items-center justify-between rounded-md border border-input bg-card px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
                                        <p className="text-sm text-muted-foreground">tip.dev/</p>
                                        <input
                                            {...field}
                                            className="flex h-10 w-full rounded-md bg-transparent px-3 py-2 pl-1 text-sm focus:outline-none focus:ring-0 focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="you"
                                            disabled={isLoading}
                                        />
                                        <div>
                                            {isAvailableLoading ? (
                                                <Spinner className="h-5 w-5 fill-muted-foreground text-muted-foreground/20" />
                                            ) : (
                                                <>
                                                    {isAvailable ? (
                                                        <CheckIcon className="h-5 w-5 text-green-500" />
                                                    ) : (
                                                        <XIcon className="h-5 w-5 text-red-500" />
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={!isAvailable || isLoading}
                    onClick={() => setIsLoading(true)}
                >
                    {isLoading && (
                        <Spinner className="fill-primary-foreground text-primary-foreground/20" />
                    )}
                    Continue
                </Button>
            </form>
        </Form>
    );
}

const profileFormSchema = z.object({
    name: z.string().min(1, "Name is too short").max(50, "Name is too long").trim().optional(),
    bio: z.string().max(200, "Bio is too long").trim().optional(),
    website: z.string().url().trim().optional()
});

const socialsObject = z.object({
    name: z.string(),
    url: z.string().url()
});

function ProfileForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [socials, setSocials] = useState<z.infer<typeof socialsObject>[]>([]);

    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(usernameFormSchema),
        defaultValues: {
            name: "",
            bio: "",
            website: ""
        }
    });

    function onSubmit(values: z.infer<typeof profileFormSchema>) {
        console.log(values);
    }

    return (
        <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onSubmit)} className="w-full space-y-8">
                <div className="space-y-3">
                    <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label className="text-muted-foreground">
                                    What&apos;s your name?
                                </Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Name"
                                        disabled={isLoading}
                                        className="bg-card"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label className="text-muted-foreground">
                                    Tell us a bit about yourself...
                                </Label>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Bio"
                                        disabled={isLoading}
                                        className="resize-none bg-card"
                                        rows={3}
                                    />
                                </FormControl>
                                <FormMessage />
                                <Label className="text-muted-foreground/60">
                                    ({profileForm.getValues("bio")?.length || 0}/200)
                                </Label>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <Label className="text-muted-foreground">
                                    Want to link your website?
                                </Label>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Website"
                                        disabled={isLoading}
                                        className="bg-card"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex w-full flex-col space-y-1">
                        <Label className="mt-3 text-muted-foreground">Link your social media</Label>
                        <div className="flex w-full space-x-2">
                            <Button variant="ghost" size="icon">
                                <GitHubIcon className="h-5 w-5 fill-card-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <TwitterIcon className="h-5 w-5 fill-card-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <LinkedInIcon className="h-5 w-5 fill-card-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <InstagramIcon className="h-5 w-5 fill-card-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <TwitchIcon className="h-5 w-5 fill-card-foreground" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <YouTubeIcon className="h-5 w-5 fill-card-foreground" />
                            </Button>
                        </div>
                    </div>
                </div>
                <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={isLoading}
                    onClick={() => setIsLoading(true)}
                >
                    {isLoading && (
                        <Spinner className="fill-primary-foreground text-primary-foreground/20" />
                    )}
                    Continue
                </Button>
            </form>
        </Form>
    );
}

function PayoutForm() {
    const [selectedMethod, setSelectedMethod] = useState<"paypal" | "stripe" | "bank">("stripe");
    useEffect(() => {
        console.log(selectedMethod);
    }, [selectedMethod]);
    return (
        <div className="mt-4 flex flex-col space-y-4">
            <PayoutOption
                method="stripe"
                selected={selectedMethod}
                setSelected={setSelectedMethod}
            />
            <p className="text-center text-muted-foreground">More options coming soon...</p>
        </div>
    );
}

function PayoutOption({
    method,
    selected,
    setSelected
}: {
    method: "paypal" | "stripe" | "bank";
    selected: "paypal" | "stripe" | "bank";
    setSelected: any;
}) {
    return (
        <Card
            className={`${
                selected === method
                    ? "cursor-pointer ring ring-ring ring-offset-4 ring-offset-background"
                    : "cursor-pointer"
            }`}
            onClick={() => setSelected(method)}
        >
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-serif font-extrabold">
                    {method === "stripe" && (
                        <StripeIcon
                            className={`h-4 w-4 ${selected === method ? "fill-primary" : "fill-foreground"}`}
                        />
                    )}
                    {method === "paypal" && (
                        <PayPalIcon
                            className={`h-4 w-4 ${selected === method ? "fill-primary" : "fill-foreground"}`}
                        />
                    )}
                    {method === "bank" && (
                        <BankIcon
                            className={`h-4 w-4 ${selected === method ? "fill-primary" : "fill-foreground"}`}
                        />
                    )}
                    {method === "paypal" ? "PayPal" : method === "stripe" ? "Stripe" : "Bank"}
                </CardTitle>
                <CardDescription>
                    {method === "paypal"
                        ? "Globally accepted and secure."
                        : method === "stripe"
                          ? "Easiest way to get paid on tip.dev. Fast, secure, global, and so many analytics!"
                          : "Direct deposit to your bank account, this may take a few days."}
                </CardDescription>
            </CardHeader>
            <CardContent className={selected === method ? "" : "hidden"}>
                <Button className="w-full font-medium">
                    {method === "paypal"
                        ? "Connect PayPal"
                        : method === "stripe"
                          ? "Connect Stripe"
                          : "Connect Bank"}
                </Button>
            </CardContent>
        </Card>
    );
}
