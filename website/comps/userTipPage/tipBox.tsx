import { useState } from "react"
import { FaDollarSign } from "react-icons/fa"
import ErrorText from "../input/errorText"
import TipBoxInfoForm from "./tipInfoInputForm"
import TipBoxCheckoutForm from "./tipCheckoutForm"
import {Elements, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useEffect } from "react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string)

export default function TipBox(props:any) {

    const pageUser = props.pageUser
    const user = props.user

    const [tipType, setTipType] = useState("One-Time")
    const [tipAmount, setTipAmount] = useState(5)
    const [tipName, setTipName] = useState("")
    const [tipMessage, setTipMessage] = useState("")
    const [tipLoading, setTipLoading] = useState(false)
    const [error, setError] = useState({} as any)

    const [step, setStep] = useState(1)

    // const [stripePromise, setStripePromise] = useState(null as any)

    // // load stripe
    // useEffect(() => {
    //     if (!user) return

    //     let stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string, {
    //         // stripeAccount: user?.stripe.id
    //     });

    //     setStripePromise(stripe)
    // }, [user])

    // validate tip amount
    const validateTipAmount = () => {
        // first make sure it is > 5
        if (tipAmount < 5) {
            setError({
                ...error,
                tipAmount: "Tip amount must be at least $5"
            })
            return false
        }

        // then make sure it is less than 1000
        if (tipAmount > 1000) {
            setError({
                ...error,
                tipAmount: "Tip amount must be less than $1,000"
            })
            return false
        }

        // then make sure it is a number
        if (isNaN(tipAmount)) {
            setError({
                ...error,
                tipAmount: "Tip amount must be a number"
            })
            return false
        }

        // then make sure it is not a decimal
        if (tipAmount % 1 != 0) {
            setError({
                ...error,
                tipAmount: "Tip amount must be a whole number"
            })
            return false
        }

        // if all checks pass, return true
        return true
    }

    return (    
        <div className="flex flex-col w-full">

            <div className="flex flex-row items-center">
                <p className="text-2xl font-bold">Support {pageUser?.username}</p>
            </div>  

            {step == 1 ? (
                <TipBoxInfoForm
                    tipType={tipType}
                    setTipType={setTipType}
                    tipAmount={tipAmount}
                    setTipAmount={setTipAmount}
                    tipName={tipName}
                    setTipName={setTipName}
                    tipMessage={tipMessage}
                    setTipMessage={setTipMessage}
                    tipLoading={tipLoading}
                    error={error}
                    setError={setError}
                    setStep={setStep}
                />
            ) : (
                <Elements stripe={stripePromise} options={{
                    clientSecret: "${id}_secret_${secret}",
                    appearance: {
                        theme: "night"
                    }
                }}>
                    <TipBoxCheckoutForm />
                </Elements>
            )}
            
        </div>
    )
}