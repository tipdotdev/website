import { useEffect, useState } from "react";
import PlusIcon from "../plusIcon";

export default function PricingCards() {

    const [price, setPrice] = useState(5)
    const [productId, setProductId] = useState("price_1NzoVRDu048W4YgBSYtx82Hw")
    const [isRecuring, setIsRecuring] = useState(false)
    const [recuringInterval, setRecuringInterval] = useState("month")

    const getPrice = async () => {

        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/stripe/platform/price/${productId}`)

        const res = await req.json()

        setPrice(res.price.unit_amount / 100)
        setIsRecuring(res.price.recurring.interval !== null)
        setRecuringInterval(res.price.recurring.interval)

    }

    useEffect(() => {
        getPrice()
    }, [])

    return (
        <div className="flex flex-col justify-center items-center w-full">
            
            <div className="flex flex-row justify-evenly items-center w-full gap-4">

                <div className="flex flex-col justify-center items-center bg-base-200 rounded-lg px-10 py-8 w-full">

                    <div className="flex flex-row gap-5 items-start w-full text-start">

                        <div className="flex flex-col">
                            <h2 className="text-6xl font-black">
                                $0
                            </h2>
                            <p className="text-lg text-zinc-400">
                                per month
                            </p>
                        </div>

                        <div className="flex flex-col justify-center items-start">
                            <h1 className="text-3xl font-bold">
                                Free Forever
                            </h1>

                            <p className="text-lg text-zinc-400">
                                For the casual developer
                            </p>
                        </div>

                    </div>

                    <p className="text-xl text-white mt-12 font-semibold mb-2 text-start w-full">
                        Features
                    </p>
                    <ul className="text-lg text-zinc-400 list-disc w-full ml-8 list-outside">
                        <li>0% platform fee on tips*</li>
                        <li>5% platform fee on subscriptions*</li>
                        <li>Basic page analytics</li>
                        <li>Basic page customization</li>
                        <li>Access to our community Discord</li>
                        <li>Basic support</li>
                        <li>No ads ever</li>
                    </ul>

                    <a href="/onboarding/signup" className="btn btn-lg btn-outline btn-neutral btn-block mt-10">
                        Get Started
                    </a>

                </div>

                <div className="flex flex-col justify-center items-center bg-base-200 rounded-lg px-10 py-8 w-full border-2 border-gold shadow">

                    <div className="flex flex-row gap-5 items-start w-full text-start">

                    <div className="flex flex-col">
                            <h2 className="text-6xl font-black">
                                ${price}
                            </h2>
                            {isRecuring ? 
                                <p className="text-lg text-zinc-400">
                                    per {recuringInterval}
                                </p>
                            :
                                <p className="text-lg text-zinc-400">
                                    one time 
                                </p>
                            }   
                        </div>

                        <div className="flex flex-col justify-center items-start">
                            
                            <div className="flex flex-row justify-center items-center gap-2">
                                <h1 className="text-3xl font-bold">
                                    tip.dev
                                </h1>
                                <PlusIcon className="w-6" />
                            </div>

                            <p className="text-lg text-zinc-400">
                                For the active developer
                            </p>
                        </div>

                    </div>

                    <p className="text-xl text-white mt-12 font-semibold mb-2 text-start w-full">
                        Features
                    </p>
                    <ul className="text-lg text-zinc-300 list-disc w-full ml-8 list-outside">
                        <li>All the features in the free plan</li>
                        <li>0% platform fees on ALL transactions*</li>
                        <li>Advanced page analytics</li>
                        <li>Superb page customization</li>
                        <li>Special perks in our Discord server</li>
                        <li>Premium Support</li>
                        <li>Special profile badge</li>
                    </ul>

                    <a href="/upgrade" className="btn btn-lg bg-gold hover:bg-gold-active text-black btn-block mt-10">
                        Get Started
                    </a>

                </div>
            </div>
        </div>
    )
}