import OnboardingNav from "@/comps/onboardingNavbar";
import SEOHead from "@/comps/seohead";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { useState } from "react";
import { FaPaypal, FaPiggyBank, FaPlus, FaStripeS } from "react-icons/fa";

const inter = Inter({ subsets: ['latin'] })

export default function page() {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isSignedIn) {
        <RedirectToSignIn />
    } 

    if (!isLoaded) {
        return (
            <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
                <span className="loading loading-spinner"></span>
            </main>
        )
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

        // redirect to stripe connect
        window.location.href = data.stripe.url

        setIsLoading(false)
    }

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
	  		<SEOHead title="{$} | Onboarding" />

            <OnboardingNav step={3} />

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

                    <div className={`w-full h-fit rounded-xl p-5 hover:border-primary bg-base-200 transition-all ease-in-out duration-150 cursor-pointer
                        ${payoutMethod == "stripe" ? (
                            "border-2 border-primary"
                        ) : (
                            ""
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
                                        <div className="badge badge-primary badge-outline">Recommended</div>
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
                                <button disabled={isLoading} className="btn btn-neutral w-full"
                                    onClick={() => connectStripe()}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        <FaPlus className="text-xl mr-2" />
                                    )}
                                    Connect Stripe
                                </button>
                            </div>
                        ) : (
                            null
                        )}

                    </div>

                    {/* <div className={`w-full h-fit bg-base-200 mt-5 rounded-xl p-5 hover:border-primary transition-all ease-in-out duration-150 cursor-pointer
                        ${payoutMethod == "standard" ? (
                            "border-2 border-primary"
                        ) : (
                            ""
                        )}
                    `}
                        onClick={() => setPayoutMethod("standard")}
                    >

                        <div className="flex flex-row justify-between">
                            <div className="flex flex-row justify-center items-center">
                                {payoutMethod == "standard" ? (
                                    <input type="radio" className="radio radio-primary" checked />
                                ) : (
                                    <input type="radio" className="radio radio-primary" />
                                )}
                                <h1 className="text-2xl font-bold ml-5">Standard Payout</h1>
                            </div>
                            <FaPiggyBank className="text-3xl" />
                        </div>

                        <div className="flex flex-col mt-5 px-10">
                            <ul className="list-disc text-md font-code text-zinc-300">
                                <li>Link your local bank</li>
                                <li>5% fee on tips</li>
                                <li>$20 withdraw minimum</li>
                            </ul>
                        </div>
                        
                        {payoutMethod == "standard" ? (
                            <div className="flex flex-row mt-5">
                                <button className="btn btn-neutral w-full">
                                    <FaPlus className="text-xl mr-2" />
                                    Connect Bank</button>
                            </div>
                        ) : (
                            null
                        )}

                    </div> */}


                </div>

            </div>
        </main>
    )

}