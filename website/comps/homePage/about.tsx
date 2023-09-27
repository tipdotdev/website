import { useState } from "react";
import RatingSmall from "./rating";

export default function HomeAbout() {

    const [ratings, setRatings] = useState([
        {
            name: "John Doe",
            review: "i love this platform",
            stars: 5,
        },
        {
            name: "Steve Jobs",
            review: "dude so cool",
            stars: 4
        },
        {
            name: "Joe Biden",
            review: "im so rich now",
            stars: 5
        },
    ])

    return (
        <div className="flex flex-col min-h-screen w-screen bg-base-100 px-5 items-center">
            <h1 className="text-5xl font-bold text-center mb-5 mt-16">
                0% transaction fee on tips
            </h1>

            <div className="flex flex-row justify-center items-center gap-4 w-1/2">
                <RatingSmall rating={ratings} />
            </div>
        </div>
    )
}