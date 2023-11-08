import { FaCaretRight, FaDiscord, FaEnvelope, FaEye, FaEyeSlash, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import Toast from "../toast";
import FomikTextInput from "../input/formikTextInput";
import ErrorText from "../input/errorText";
import { TbDiscountCheckFilled } from "react-icons/tb";
import useUser from "../../hooks/useUser";
import Turnstile from "../turnstile";
import GithubLoginButton from "../oauthButtons/github";
import GoogleLoginButton from "../oauthButtons/google";
import TwitterLoginButton from "../oauthButtons/twitter";
import AppleLoginButton from "../oauthButtons/apple";
import OAuthOptions from "../oauthButtons/optionsContainer";


export default function SigninForm() {

    const signinAvailable = false

    const [email, setEmail] = useState("" as any)
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const [ showToast, setShowToast ] = useState(false)
	const [ toastError, setToastError ] = useState(false)
	const [ toastErrorText, setToastErrorText ] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showEmailOption, setShowEmailOption] = useState(false)

    const [validEmail, setValidEmail] = useState(false)

    const [error, setError] = useState({} as any)
    const [turnstileToken, setTurnstileToken] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            // turnstile call back sets the token by doing window.parent.postMessage(token, '*')
            // get the token from the parent window
            window.addEventListener("message", (event) => {
                if (event.data) {
                    if (event.data.token) {
                        setTurnstileToken(event.data.token)
                    }
                }
            })
        }
    })

    const { saveToken } = useUser()

    const signin = async () => {
        setIsLoading(true) 

        let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                cfTurnstileResponse: turnstileToken,
            })
        })

        if (req.status === 200) {
            let data = await req.json()

            // store token in local storage
            saveToken(data.token)

            setIsLoading(false)
            window.location.href = "/dashboard"
        } else {
            const data = await req.json()
            
            setToastError(true)
            setToastErrorText(data.message)
            setShowToast(true)
            setIsLoading(false)

            if (data.message == "incorrect password") {
                setError({
                    ...error,
                    password: "Incorrect password"
                })
            } else if (data.message == "user not found") {
                setError({
                    ...error,
                    email: "User not found"
                })
            }

            setTimeout(() => {
                setShowToast(false)
            }, 5000)
        }
    }

    const validateEmail = (email:string) => {
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

    useEffect(() => {
        if (email.length > 0) {
            validateEmail(email)
        }
    }, [email])

    useEffect(() => {
        if (email != "" && password != "" && validEmail && turnstileToken != "") {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [email, password, validEmail, turnstileToken])

    return (

        <div className="w-full max-w-sm mb-10">
            {signinAvailable ? (
                <>
                    <h1 className="text-4xl font-bold mt-12">Welcome back</h1>

                    <OAuthOptions />

                    <div className="divider mb-10 mt-10">OR</div>

                    {!showEmailOption ? (
                        <button className="btn btn-neutral btn-block normal-case mb-4" onClick={() => {
                            setShowEmailOption(true)
                        }}>
                            <FaEnvelope className="mr-2 text-xl" />
                            Continue with Email
                        </button>
                    ) : (

                        <form onSubmit={(e) => { e.preventDefault() }} className="form-control ">               

                            <div>
                                <input type="email" placeholder="Email" className="input input-bordered w-full"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />
                                {error.email && (
                                    <ErrorText text={error.email} />
                                )}
                            </div>

                            <div className="mt-2">
                                <div className="join w-full">
                                    <input type={showPassword ? "text" : "password"} placeholder="Password" className="input w-full input-bordered join-item border-r-0 rounded-r-none" 
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                    />
                                    <p className="btn btn-ghost border-1 border-[#4e515a] border-l-0 rounded-lg rounded-l-none" onClick={() => {
                                        setShowPassword(!showPassword)
                                    }}>
                                        {!showPassword ? (
                                            <FaEye />
                                        ) : (
                                            <FaEyeSlash />
                                        )}
                                    </p> 
                                </div>
                                {error.password && (
                                    <ErrorText text={error.password} />
                                )}
                            </div>

                            <div className="mt-2">
                                <a className="text-sm link text-[#949ca8] link-hover link-primary cursor-pointer" href={'/forgot-password'}>Forgot password</a>
                            </div>

                            <div className="mt-10 text-left">

                                <Turnstile />

                                <button disabled={isLoading || isDisabled} className="btn btn-primary w-full mb-4"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signin()
                                    }}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : (
                                        null
                                    )}
                                    Continue
                                </button>

                                <a className="text-sm link-hover link-primary cursor-pointer" href={'/onboarding/signup'}>Don't have an account?</a>
                            </div>
                        </form>
                    )}

                    {showToast && (
                        <>
                            {toastError && (
                                <Toast type="error" text={toastErrorText} />
                            )}
                        </>
                    )}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center">
                        <img src="/svg/logo.svg" className="h-24 w-fit" />
                        <h1 className="text-2xl font-medium mt-12 text-center">Signins are closed for now</h1>
                        <p className="text-center mt-2 text-zinc-400">We're working on improving the platform, and will open up again soon.</p>

                        <div className="divider mt-5 mb-5"></div>

                        <div className="flex flex-col items-center justify-center">
                            <p className="text-zinc-400">Connect with us to stay updated!</p>
                            <div className="flex flex-row gap-2 mt-4">
                                <a href="/discord" target="_blank" className="btn btn-primary text-xl">
                                    <FaDiscord />
                                </a>
                                <a href="https://twitter.com/tipdotdev" target="_blank" className="btn btn-primary text-xl">
                                    <FaTwitter/>
                                </a>
                                <a href="https://instagram.com/tipdotdev" target="_blank" className="btn btn-primary text-xl">
                                    <FaInstagram/>
                                </a>
                            </div>
                        </div>
                    </div>
            )}
        </div>
    )
}