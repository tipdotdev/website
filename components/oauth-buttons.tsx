"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import GitHubIcon from "@/public/icons/github-icon.svg";
import { useState } from "react";
import Spinner from "./ui/spinner";

export default function OauthButtons() {
    const [isDisabled, setIsDisabled] = useState(false);
    return (
        <div className="flex w-full flex-col items-center space-y-2">
            <GitHubOauthButton isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
            <GoogleOauthButton isDisabled={isDisabled} setIsDisabled={setIsDisabled} />
        </div>
    );
}

function GitHubOauthButton({
    isDisabled = false,
    setIsDisabled = null
}: {
    isDisabled?: boolean;
    setIsDisabled?: any;
}) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Button
            className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/80"
            onClick={() => {
                setIsLoading(true);
                setIsDisabled(true);
            }}
            disabled={isDisabled}
        >
            {isLoading ? (
                <Spinner className="h-4 w-4 fill-accent-foreground text-accent-foreground/20" />
            ) : (
                <GitHubIcon className="h-4 w-4 fill-accent-foreground" />
            )}
            Continue with GitHub
        </Button>
    );
}

function GoogleOauthButton({
    isDisabled = false,
    setIsDisabled = null
}: {
    isDisabled?: boolean;
    setIsDisabled?: any;
}) {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Button
            className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/80"
            onClick={() => {
                setIsLoading(true);
                setIsDisabled(true);
            }}
            disabled={isDisabled}
        >
            {isLoading ? (
                <Spinner className="h-4 w-4 fill-accent-foreground text-accent-foreground/20" />
            ) : (
                <Image src="/images/webp/google-logo.webp" width={16} height={16} alt="Google" />
            )}
            Continue with Google
        </Button>
    );
}
