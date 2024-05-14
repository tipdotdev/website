"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import GitHubIcon from "@/public/icons/github-icon.svg";
import { useState } from "react";
import Spinner from "./ui/spinner";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Type = "signin" | "signup";

export default function OauthButtons({ type }: { type: Type }) {
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(false);
    return (
        <div className="flex w-full flex-col items-center space-y-2">
            <GitHubOauthButton
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                router={router}
                type={type}
            />
            <GoogleOauthButton
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                router={router}
                type={type}
            />
        </div>
    );
}

function GitHubOauthButton({
    isDisabled = false,
    setIsDisabled = null,
    router,
    type
}: {
    isDisabled?: boolean;
    setIsDisabled?: any;
    router: any;
    type: Type;
}) {
    const [isLoading, setIsLoading] = useState(false);

    async function onClick() {
        setIsLoading(true);
        setIsDisabled(true);
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/github${
                    type === "signup"
                        ? "?continue=" + encodeURIComponent("/onboarding/username")
                        : ""
                }`
            );
            if (res.status === 200) {
                router.push(res.data.data.url);
            }
        } catch (error) {
            toast.error("An error occurred while trying to sign in with GitHub");
            setIsLoading(false);
            setIsDisabled(false);
        }
    }

    return (
        <Button
            className="bg-accent text-accent-foreground hover:bg-accent/80 w-full gap-2"
            onClick={() => {
                onClick();
            }}
            disabled={isDisabled}
        >
            {isLoading ? (
                <Spinner className="fill-accent-foreground text-accent-foreground/20 h-4 w-4" />
            ) : (
                <GitHubIcon className="fill-accent-foreground h-4 w-4" />
            )}
            Continue with GitHub
        </Button>
    );
}

function GoogleOauthButton({
    isDisabled = false,
    setIsDisabled = null,
    router,
    type
}: {
    isDisabled?: boolean;
    setIsDisabled?: any;
    router: any;
    type: Type;
}) {
    const [isLoading, setIsLoading] = useState(false);

    async function onClick() {
        setIsLoading(true);
        setIsDisabled(true);
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/google${
                    type === "signup"
                        ? "?continue=" + encodeURIComponent("/onboarding/username")
                        : ""
                }`
            );
            if (res.status === 200) {
                router.push(res.data.data.url);
            }
        } catch (error) {
            toast.error("An error occurred while trying to sign in with Google");
            setIsLoading(false);
            setIsDisabled(false);
        }
    }
    return (
        <Button
            className="bg-accent text-accent-foreground hover:bg-accent/80 w-full gap-2"
            onClick={() => {
                onClick();
            }}
            disabled={isDisabled}
        >
            {isLoading ? (
                <Spinner className="fill-accent-foreground text-accent-foreground/20 h-4 w-4" />
            ) : (
                <Image src="/images/webp/google-logo.webp" width={16} height={16} alt="Google" />
            )}
            Continue with Google
        </Button>
    );
}
