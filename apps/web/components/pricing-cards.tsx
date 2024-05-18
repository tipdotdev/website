"use client";

import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default function PricingCards() {
    return (
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
            <PricingCard
                price={0}
                perMonth={false}
                description="For the occasional user."
                accentColor="red"
                badgeText="Basic"
                featureListLabel="Most everything you need:"
                featureList={["Feature 1", "Feature 2", "Feature 3"]}
            />

            <PricingCard
                price={5}
                description="For the regular user."
                accentColor="yellow"
                badgeText="Plus"
                accentBorder
                featureListLabel="Everything in Basic, plus:"
                featureList={["Feature 1", "Feature 2", "Feature 3"]}
            />

            <PricingCard
                price={15}
                description="For the super user."
                accentColor="green"
                badgeText="Plus Plus"
                featureListLabel="Everything in Plus, plus:"
                featureList={["Feature 1", "Feature 2", "Feature 3"]}
            />
        </div>
    );
}

type PricingCardProps = {
    price: number;
    description: string;
    accentColor: string;
    badgeText: string;
    accentBorder?: boolean;
    perMonth?: boolean;
    featureListLabel: string;
    featureList: string[];
};

export function PricingCard({
    price,
    description,
    accentColor,
    badgeText,
    accentBorder = false,
    perMonth = true,
    featureListLabel,
    featureList
}: PricingCardProps) {
    const gfcn = (type: "border" | "bg" | "text", bgOpacity?: boolean) => {
        if (accentColor === "red") {
            if (type === "border") return `border-red-500`;
            if (type === "bg") {
                if (bgOpacity) return `bg-red-500/15`;
                return `bg-red-500`;
            }
            if (type === "text") return `text-red-300`;
        } else if (accentColor === "yellow") {
            if (type === "border") return `border-yellow-500`;
            if (type === "bg") {
                if (bgOpacity) return `bg-yellow-500/15`;
                return `bg-yellow-500`;
            }
            if (type === "text") return `text-yellow-300`;
        } else if (accentColor === "green") {
            if (type === "border") return `border-green-500`;
            if (type === "bg") {
                if (bgOpacity) return `bg-green-500/15`;
                return `bg-green-500`;
            }
            if (type === "text") return `text-green-300`;
        }
    };

    return (
        <div
            className={cn(
                "bg-card flex w-full flex-col rounded-lg border p-4",
                accentBorder && gfcn("border")
            )}
        >
            <Badge
                className={cn(
                    `hover:bg- w-fit`,
                    `${gfcn("border")} ${gfcn("bg", true)} ${gfcn("text")}`
                )}
            >
                {badgeText}
            </Badge>

            <div className="mt-4 flex flex-col">
                <h2 className="font-serif text-3xl font-extrabold">
                    ${price}
                    <span className="text-foreground/60 text-lg font-bold">
                        {perMonth ? " / month" : ""}
                    </span>
                </h2>
                <p className="text-foreground/60 text-md">{description}</p>
            </div>

            <div className="mt-4 flex flex-col">
                <h3 className="text-foreground/60 text-md font-bold">{featureListLabel}</h3>
                <ul className="list mt-2 list-inside list-disc">
                    {featureList.map((feature) => (
                        <li key={feature} className="text-foreground/60 list-item text-sm">
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <Button
                className={cn(
                    `hover:bg- mt-4 w-full hover:bg-opacity-80`,
                    `${gfcn("border")} ${gfcn("bg")}`
                )}
            >
                Get Started
            </Button>
        </div>
    );
}
