// import { ConnectPayments } from "@stripe/react-connect-js";
import { CardCvcElement, CardElement, CardExpiryElement, CardNumberElement, PaymentElement, useElements, useStripe, ExpressCheckoutElement, AddressElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import ErrorText from "../input/errorText";
import InfoTooltip from "../infoTooltip";

export default function TipBoxCheckoutForm(props:any) {
    const stripe = useStripe();
    const elements = useElements();

    const [errors, setErrors] = useState({} as any)

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.

            return;
        }

        const {error: submitError} = await elements.submit();
        if (submitError) {
            // handleError(submitError);
            console.error(submitError)
            return;
        }

        let domain = window.location.hostname
        if (domain == "localhost") domain = "http://localhost:3000"
        else domain = "https://" + domain

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret: props.clientSecret,
            confirmParams: {
                return_url: `${domain}/${props.user?.username}?status=success`
            },
            redirect: "if_required",
        });

        if (error) {
            handleError(error);
        } else {
            handleSuccess();
        }
    }

    const handleError = (error: any) => {
        console.error(error)
        setErrors({
            card: error.message
        })
    }

    const handleSuccess = () => {
        props.setStep(1);
        props.setEmail("")
        props.setShowConfetti(true)
        props.openModal('success')
    }

    return (
        <>
            <form className="flex flex-col w-full h-full" onSubmit={(e) => {
                e.preventDefault()
                handleSubmit(e)
            }}>
                
                <div className="mt-5 rounded-lg bg-base-200">

                    <div className="flex flex-col w-full">
                        <label className="text-md font-semibold text-zinc-400 ml-1 mb-1">Card Details</label>

                        <PaymentElement />

                        {errors.card && (
                            <ErrorText text={errors.card} />
                        )}

                    </div>


                    <div className="flex flex-row items-center justify-center mt-3 gap-2 bg-base-100 w-full rounded-md p-5 shadow-sm border border-neutral shadow-black text-center">
                        <p className="text-md font-medium text-zinc-400">Secured by <a href={"https://stripe.com"} target={"_blank"} className="link link-hover">Stripe</a></p>
                        <InfoTooltip text={"Your card details are never readable by our servers. All payment info is collected and processed directly through Stripe."} color={"text-zinc-400"} />
                    </div>
                </div>

                
                <div className="flex flex-row text-left justify-start mt-5 gap-2 btn btn-ghost w-fit" onClick={() => {
                    props.setStep(1)
                }}>
                    <FaArrowLeft className="text-zinc-400" /> 
                    <p className="font-semibold text-zinc-400">Go Back</p>
                </div>

                <p className="text-sm font-semibold text-zinc-400 mt-5">By clicking Tip ${props.amount}, you agree to the <a href="/terms" target="_blank" className="link-primary link-hover text-zinc-400">Terms</a> and <a href="/privacy" target="_blank" className="link-primary link-hover text-zinc-400">Privacy Policy</a></p>

                <button className="btn btn-primary mt-2 btn-lg normal-case" disabled={
                    props.email == "" || props.email == null || props.email == undefined || !stripe || !elements
                }>Tip ${props.amount}</button>

            </form>
            
        </>
    )
} 