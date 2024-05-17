import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export default function StatTrend({ dir, val }: { dir: "up" | "down"; val?: number }) {
    return (
        <div className="flex flex-col items-center -space-y-1">
            {dir === "up" ? (
                <TrendingUpIcon className="h-5 w-5 text-green-500" />
            ) : (
                <TrendingDownIcon className="h-5 w-5 text-red-500" />
            )}
            {val && (
                <p
                    className={`text-xs font-normal ${dir === "up" ? "text-green-500" : "text-red-500"}`}
                >
                    {val}%
                </p>
            )}
        </div>
    );
}
