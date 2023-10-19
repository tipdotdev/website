import { useState } from "react"
import { FaDollarSign, FaTwitter } from "react-icons/fa"
import ErrorText from "../input/errorText"
import TipBoxInfoForm from "./tipInfoInputForm"
import TipBoxCheckoutForm from "./tipCheckoutForm"
import {Elements, PaymentElement, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useEffect } from "react"
import PaymentComplete from "./paymentComplete"
import ReactConfetti from "react-confetti"
import {
    ConnectPayments,
    ConnectComponentsProvider,
} from "@stripe/react-connect-js";
import { loadConnect } from "@stripe/connect-js";

export default function TipBox(props:any) {

    // get the page query
    const query = props.query
    const [status, setStatus] = useState(query?.split("&")[2].split("=")[1])

    const pageUser = props.pageUser
    const user = props.user

    const [tipType, setTipType] = useState("One-Time")
    const [tipAmount, setTipAmount] = useState(5)
    const [tipName, setTipName] = useState("")
    const [tipMessage, setTipMessage] = useState("")
    const [tipLoading, setTipLoading] = useState(false)
    const [error, setError] = useState({} as any)
    const [email, setEmail] = useState(user?.email || "" as any)
    const [validEmail, setValidEmail] = useState(false)

    const [step, setStep] = useState(1)

    const [clientSecret, setClientSecret] = useState("" as any)

    const [windowWidth, setWindowWidth] = useState(0)
    const [windowHeight, setWindowHeight] = useState(0)

    const [stripePromise, setStripePromise] = useState(null as any)

    useEffect(() => {
        if (!pageUser?.stripe?.id) return

        const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string, {
            stripeAccount: pageUser.stripe.id,
        });
        setStripePromise(stripePromise)
    }, [pageUser])

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWindowWidth(window.innerWidth)
            setWindowHeight(window.innerHeight)
        }
    }, [])

    useEffect(() => {
        if (user) {
            setEmail(user.email)
        }
    }, [user])

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

    const validateEmail = () => {
        if (email.length != 0) {
            let re = /\S+@\S+\.\S+/;
            let valid = re.test(email);

            if (valid) {
                setValidEmail(true)
                setError({
                    ...error,
                    email: null
                })
            } else {
                setValidEmail(false)
                setError({
                    ...error,
                    email: "Email is not valid"
                })
            }
        }
    }

    const createIntent = async () => {
        if (!validateTipAmount()) return
        if (!validEmail) return

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/stripe/create/payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount: tipAmount * 100,
                currency: "usd",
                username: pageUser?.username,
                tipper: user?.username || null,
                message: tipMessage,
                name: tipName,
                email: email,
            })
        })

        if (res.status == 200) {
            const data = await res.json()

            setClientSecret(data.client_secret)
            setStep(2)
        }


    }

    const openModal = (social: string) => {
        if (social == "success") {
            const modal = document.getElementById("success_modal") as any
            modal?.showModal()
        }
    }

    useEffect(() => {
        if (status == "succeeded") {
            setShowConfetti(true)
            openModal('success')
            
            // clear the query
            window.history.replaceState({}, document.title, "/" + pageUser?.username)
            setStatus("")
        }
    })

    useEffect(() => {
        validateEmail()
    }, [email])

    const [showConfetti, setShowConfetti] = useState(false as any)

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
                    continue={createIntent}
                    setEmail={setEmail}
                    email={email}
                    validEmail={validEmail}
                />
            ) : step == 2 ? (
                <Elements stripe={stripePromise} options={{
                    clientSecret: clientSecret,
                    appearance: {
                        theme: "night",
                        labels: "floating",
                        variables: {
                            colorBackground: "#272935",
                            colorPrimary: "#ff7ac6",
                        }
                    },
                    // paymentMethodTypes: ['card', 'paypal'],
                    // mode: 'payment',
                    // amount: tipAmount * 100,
                    // currency: "usd",
                }}>
                    <TipBoxCheckoutForm user={pageUser} amount={tipAmount} setEmail={setEmail} clientSecret={clientSecret} setStep={setStep} email={email} setShowConfetti={setShowConfetti} openModal={openModal} />
                </Elements>
                // <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
                //     <TipBoxCheckoutForm user={pageUser} amount={tipAmount} setEmail={setEmail} />
                // </ConnectComponentsProvider>
            ) : (
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
                    continue={createIntent}
                    setEmail={setEmail}
                    email={email}
                    validEmail={validEmail}
                />
            )}

                {showConfetti && 
                <>
                    
                </>
            
            }

            {/* success modal */}
            <dialog id="success_modal" className="modal">
                <ReactConfetti 
                    width={windowWidth}
                    height={windowHeight}
                    numberOfPieces={200}
                />
                <form method="dialog" className="modal-box w-full">
                
                    <h3 className="font-bold text-3xl">🎉 Thank you for your support</h3>

                    <p className="text-lg mt-2 text-zinc-400">Your tip has been sent to {pageUser?.username}, and a receipt has been emailed to you.</p>

                    <p className="text-lg mt-5 font-semibold">People like you allow developers to keep creating amazing projects for the world to use!</p>

                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            
        </div>
    )
}