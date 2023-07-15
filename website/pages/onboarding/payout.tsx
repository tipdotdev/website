import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { useState } from "react";
import { FaPaypal, FaPlus, FaStripeS } from "react-icons/fa";

const inter = Inter({ subsets: ['latin'] })

export default function page() {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isSignedIn) {
        <RedirectToSignIn />
    }

    const [ currency, setCurrency ] = useState("")
    const [ payoutMethod, setPayoutMethod ] = useState("")

    const [ isLoading, setIsLoading ] = useState(false)

    const connectStripe = async () => {
        setIsLoading(true)

        const res = await fetch("/api/onboarding/connect-stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                currency: currency
            })
        })
    
        const data = await res.json()

        console.log(data)

        setIsLoading(false)
    }

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
            <h1 className="text-4xl font-bold mt-12">Select your payout preference</h1>

            <div className="form-control w-full max-w-lg mb-12">

                <div className="mt-10 w-full">
                    <label className="label">
                        <span className="label-text text-md font-code">What's your currency?</span>
                    </label>
                    <select className="select select-bordered w-full"
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option disabled selected>Pick one</option>
                        <option>USD - United States Dollar</option>
                    </select>
                </div>

                <div className="mt-10 w-full">

                    <div className={`w-full h-fit border-2 rounded-xl p-5 hover:border-primary transition-all ease-in-out duration-150 cursor-pointer
                        ${payoutMethod == "stripe" ? (
                            "border-primary"
                        ) : (
                            "border-zinc-600"
                        )}
                    `}
                        onClick={() => setPayoutMethod("stripe")}
                    >

                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row justify-center items-center">
                                {payoutMethod == "stripe" ? (
                                    <input type="radio" className="radio radio-primary" checked />
                                ) : (
                                    <input type="radio" className="radio radio-primary" />
                                )}
                                <h1 className="text-2xl font-bold ml-5">Stripe
                                    <span className="text-sm font-normal ml-2 text-zinc-300">
                                        (recommended)
                                    </span>
                                </h1>
                            </div>
                            <FaStripeS className="text-3xl" />
                        </div>

                        <div className="flex flex-col mt-5 px-10">
                            <ul className="list-disc text-md font-code text-zinc-300">
                                <li>Instant payout to your Stripe account</li>
                                <li>0% fee on tips</li>
                                <li>Available in 40 countries</li>
                                <li>More payment options for tippers</li>
                            </ul>
                        </div>

                        {payoutMethod == "stripe" ? (
                            <div className="flex flex-row mt-5">
                                <button className="btn btn-neutral w-full">
                                    <FaPlus className="text-xl mr-2" />
                                    Connect Stripe</button>
                            </div>
                        ) : (
                            null
                        )}

                    </div>

                    <div className={`w-full h-fit border-2 mt-5 rounded-xl p-5 hover:border-primary transition-all ease-in-out duration-150 cursor-pointer
                        ${payoutMethod == "paypal" ? (
                            "border-primary"
                        ) : (
                            "border-zinc-600"
                        )}
                    `}
                        onClick={() => setPayoutMethod("paypal")}
                    >

                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row justify-center items-center">
                                {payoutMethod == "paypal" ? (
                                    <input type="radio" className="radio radio-primary" checked />
                                ) : (
                                    <input type="radio" className="radio radio-primary" />
                                )}
                                <h1 className="text-2xl font-bold ml-5">PayPal</h1>
                            </div>
                            <FaPaypal className="text-3xl" />
                        </div>

                        <div className="flex flex-col mt-5 px-10">
                            <ul className="list-disc text-md font-code text-zinc-300">
                                <li>Instant payout to your PayPal account</li>
                                <li>0% fee on tips</li>
                                <li>Tippers can only pay with PayPal or Venmo</li>
                            </ul>
                        </div>
                        
                        {payoutMethod == "paypal" ? (
                            <div className="flex flex-row mt-5">
                                <button className="btn btn-neutral w-full">
                                    <FaPlus className="text-xl mr-2" />
                                    Connect PayPal</button>
                            </div>
                        ) : (
                            null
                        )}

                    </div>


                </div>

            </div>
        </main>
    )

}