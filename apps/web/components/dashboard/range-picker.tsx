"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { useState } from "react";

const ranges = [
    {
        value: "last-30-days",
        label: "Last 30 days"
    },
    {
        value: "all-time",
        label: "All time"
    },
    {
        value: "last-7-days",
        label: "Last 7 days"
    },
    {
        value: "last-90-days",
        label: "Last 90 days"
    }
];

export default function RangePicker() {
    const [value, setValue] = useState("");

    return (
        <Select>
            <SelectTrigger className="hover:bg-accent h-fit w-fit gap-2 bg-transparent px-2 py-1 transition-all duration-150 ease-in-out">
                <SelectValue placeholder={value || ranges[0].label} />
            </SelectTrigger>
            <SelectContent className="w-fit">
                {ranges.map((range) => (
                    <SelectItem
                        value={range.label}
                        key={range.value}
                        onClick={() => setValue(range.value)}
                        className="w-full items-start justify-start pl-2 text-left"
                    >
                        {range.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
