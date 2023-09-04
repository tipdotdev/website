import { FaCaretRight, FaDiscord, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import Toast from "../toast";
import FomikTextInput from "../input/formikTextInput";
import ErrorText from "../input/errorText";
import { TbDiscountCheckFilled } from "react-icons/tb";
import useUser from "../../hooks/useUser";


export default function VerifyEmail(props:any) {

    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    const [error, setError] = useState({} as any)

    const verifyCode = async () => {
        setIsLoading(true) 

        let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.token
            },
            body: JSON.stringify({
                code: code
            })
        })

        
    }

    function OTPInput() {

        // save the code
        const first:any = document.getElementById("first")
        const second:any  = document.getElementById("second")
        const third:any  = document.getElementById("third")
        const fourth:any  = document.getElementById("fourth")
        const fifth:any  = document.getElementById("fifth")
        const sixth:any  = document.getElementById("sixth")

        first.addEventListener("keyup", () => {
            if (first.value.length > 0) {
                second.focus()
            }
        })

        second.addEventListener("keyup", () => {
            if (second.value.length > 0) {
                third.focus()
            }
        })

        third.addEventListener("keyup", () => {
            if (third.value.length > 0) {
                fourth.focus()
            }
        })

        fourth.addEventListener("keyup", () => {
            if (fourth.value.length > 0) {
                fifth.focus()
            }
        })

        fifth.addEventListener("keyup", () => {
            if (fifth.value.length > 0) {
                sixth.focus()
            }
        })

        sixth.addEventListener("keyup", () => {
            if (sixth.value.length > 0) {
                sixth.blur()
            }
        })

        // check if all inputs are filled
        const inputsArr = [first, second, third, fourth, fifth, sixth]

        inputsArr.forEach((input:any) => {
            input.addEventListener("keyup", () => {
                if (first.value.length > 0 && second.value.length > 0 && third.value.length > 0 && fourth.value.length > 0 && fifth.value.length > 0 && sixth.value.length > 0) {
                    
                    // set the code
                    setCode(`${first.value}${second.value}${third.value}${fourth.value}${fifth.value}${sixth.value}`)

                    setIsDisabled(false)
                } else {
                    setIsDisabled(true)
                }
            })
        })
    }

    useEffect(() => {
        OTPInput()
    }, [])

    return (
        <div className="w-full max-w-sm">

            <h1 className="text-4xl font-bold mt-12">Verify email</h1>
            <p className="text-lg mt-2 text-zinc-400">We've sent you an email with a code. Enter it below to continue.</p>

            <form onSubmit={(e) => { e.preventDefault() }} className="form-control ">               
                {/* <div className="mt-10">
                    <input type="code" placeholder="Code" className="input input-bordered w-full"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setCode(e.target.value)
                            }
                        }}
                    />
                    {error.code && (
                        <ErrorText text={error.code} />
                    )}
                </div> */}

                <div id="otp" className="flex flex-row text-center mt-5">
                    <input className="mr-1 input input-bordered h-16 w-12 text-center text-2xl" type="text" id="first" maxLength={1} /> 
                    <input className="ml-1 mr-1 input input-bordered h-16 w-12 text-center text-2xl" type="text" id="second" maxLength={1} /> 
                    <input className="ml-1 mr-1 input input-bordered h-16 w-12 text-center text-2xl" type="text" id="third" maxLength={1} /> 
                    <input className="ml-1 mr-1 input input-bordered h-16 w-12 text-center text-2xl" type="text" id="fourth" maxLength={1} />
                    <input className="ml-1 mr-1 input input-bordered h-16 w-12 text-center text-2xl" type="text" id="fifth" maxLength={1} /> 
                    <input className="ml-1 input input-bordered h-16 w-12 text-center text-2xl" type="text" id="sixth" maxLength={1} />
                </div>

                <div className="mt-12 text-left">

                    <button disabled={isLoading || isDisabled} className="btn btn-primary w-full mb-4"
                        onClick={() => {
                            verifyCode()
                        }}
                    >
                        {isLoading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            null
                        )}
                        Continue
                    </button>
                </div>
            </form>
        </div>
    )
}