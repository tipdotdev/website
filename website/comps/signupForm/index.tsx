import { FaCaretRight, FaDiscord, FaEye, FaEyeSlash, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import Toast from "../toast";
import FomikTextInput from "../input/formikTextInput";
import ErrorText from "../input/errorText";
import { TbDiscountCheckFilled } from "react-icons/tb";
import useUser from "../../hooks/useUser";
import Turnstile from "@/comps/turnstile";


export default function SignupForm(props:any) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false)
    const [joinNews, setJoinNews] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const [ showToast, setShowToast ] = useState(false)
	const [ toastError, setToastError ] = useState(false)
	const [ toastErrorText, setToastErrorText ] = useState("")

    const [validEmail, setValidEmail] = useState(false)
    const [validUsername, setValidUsername] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    const [error, setError] = useState({} as any)

    const [turnstileToken, setTurnstileToken] = useState("")

    const [signupAvailable, setSignupAvailable] = useState(true)

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

    const signup = async () => {
        setIsLoading(true) 

        let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                cfTurnstileResponse: turnstileToken,
                joinNews: joinNews
                
            })
        })

        if (req.status === 200) {
            let data = await req.json()

            // store token in local storage
            // saveToken(data.token)
            // save userID in local storage
            localStorage.setItem("td:userID", data.userID)

            props.setShowVerify(true)

        } else {
            const data = await req.json()
            setToastError(true)
            setToastErrorText(data.error.message)
            setShowToast(true)
            setIsLoading(false)

            setTimeout(() => {
                setShowToast(false)
            }, 5000)
        }
    }

    const checkUsernameAvailability = async () => {
        if (username.length > 0) {
            let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/check/${username}`)
            if (req.status === 200) {
                setValidUsername(true)
                setError({
                    ...error,
                    username: null
                })
            } else {
                let data = await req.json()
                setValidUsername(false)
                console.log(data)
                setError({
                    ...error,
                    username: data
                })
            }
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

    const validatePassword = (password:string) => {
        // password must be at least 8 characters
        // password must contain at least 1 uppercase letter
        // password must contain at least 1 lowercase letter
        // password must contain at least 1 number
        // it can contain special characters

        if (password.length != 0) {
            let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
            let valid = re.test(password);

            if (valid) {
                setValidPassword(true)
                setError({
                    ...error,
                    password: null
                })
            } else {
                setValidPassword(false)
                setError({
                    ...error,
                    password: "Password must be at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"
                })
            }
        }
    }

    useEffect(() => {
        checkUsernameAvailability()
    }, [username])

    useEffect(() => {
        validateEmail(email)
    }, [email])

    useEffect(() => {
        validatePassword(password)
    }, [password])

    useEffect(() => {
        if (username != "" && password != "" && email != "" && agreeTerms && !isLoading && validUsername && validEmail && validPassword && turnstileToken != "") {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [username, password, email, agreeTerms, isLoading, error, validUsername, validEmail, validPassword, turnstileToken])

    return (
        <div className="w-full max-w-sm">

            {signupAvailable ? (
                <>
                    <h1 className="text-4xl font-bold mt-12">Sign up for tip.dev</h1>

                    <form method="POST" onSubmit={(e) => {

                        e.preventDefault()
                        signup()

                    }} className="form-control">               
                        <div className="mt-10">
                            <input type="email" placeholder="Email" className="input input-bordered w-full"
                                onChange={(e) => {
                                    if (e.target.value.length > 0) {
                                        setEmail(e.target.value)
                                    }
                                }}
                            />
                            {error.email && (
                                <ErrorText text={error.email} />
                            )}
                        </div>

                        <div className="mt-2">
                            <input type="text" placeholder="Username" className="input input-bordered w-full"
                                onChange={(e) => {
                                    if (e.target.value.length > 0) {
                                        setUsername(e.target.value)
                                    }
                                }}
                            />
                            {error.username && (
                                <ErrorText text={error.username} />
                            )}
                        </div>

                        <div className="mt-2">
                            <div className="join w-full">
                                <input type={showPassword ? "text" : "password"} placeholder="Password" className="input w-full input-bordered join-item border-r-0 rounded-r-none" 
                                    onChange={(e) => {
                                        if (e.target.value.length > 0) {
                                            setPassword(e.target.value)
                                        }
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
                            
                            <label className="label cursor-pointer justify-start w-full text-left items-center" onClick={() => {
                                setAgreeTerms(!agreeTerms)
                            }}>
                                
                                <input type="checkbox" checked={agreeTerms} className="checkbox checkbox-primary" />
                                <p className="label-text ml-2 text-[#949ca8]">I agree to the <a href="/terms" target="_blank" className="link-primary link-hover text-[#949ca8]">Terms</a> and <a href="/privacy" target="_blank" className="link-primary link-hover text-[#949ca8]">Privacy Policy</a></p> 

                            </label>
                        </div>

                        <div className="mt-[-5px]">
                            
                            <label className="label cursor-pointer justify-start w-full text-left items-center" onClick={() => {
                                setJoinNews(!joinNews)
                            }}>
                                
                                <input type="checkbox" checked={joinNews} className="checkbox checkbox-primary" />
                                <p className="label-text ml-2 text-[#949ca8]">Recieve updates and news via email?</p>   

                            </label>
                        </div>

                        <div className="mt-12 text-left">

                            <Turnstile />

                            <button disabled={isLoading || isDisabled} className="btn btn-primary w-full mb-4">
                                {isLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    null
                                )}
                                Continue
                            </button>

                            <a className="text-sm link-hover link-primary cursor-pointer" href={'/signin'}>Already have an account?</a>
                        </div>
                    </form>

                    {showToast && (
                        <>
                            {toastError && (
                                <Toast type="error" text={toastErrorText} />
                            )}
                        </>
                    )}
                </>
            ) : (
                <h1 className="text-4xl font-bold mt-12 text-center">Signups are closed for now</h1>
            )}
        </div>
    )
}