import { FaCaretRight, FaDiscord, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import Toast from "../toast";
import FomikTextInput from "../input/formikTextInput";
import ErrorText from "../input/errorText";
import { TbDiscountCheckFilled } from "react-icons/tb";
import useUser from "../../hooks/useUser";


export default function SigninForm() {

    const [email, setEmail] = useState("" as any)
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const [ showToast, setShowToast ] = useState(false)
	const [ toastError, setToastError ] = useState(false)
	const [ toastErrorText, setToastErrorText ] = useState("")

    const [validEmail, setValidEmail] = useState(false)

    const [error, setError] = useState({} as any)

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
            setToastErrorText(data.error.message)
            setShowToast(true)
            setIsLoading(false)

            if (data.error.message == "incorrect password") {
                setError({
                    ...error,
                    password: "Incorrect password"
                })
            } else if (data.error.message == "user not found") {
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
        if (email != "" && password != "" && validEmail) {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [email, password, validEmail])

    return (
        <div className="w-full max-w-sm">

            <h1 className="text-4xl font-bold mt-12">Welcome back</h1>

            <form onSubmit={(e) => { e.preventDefault() }} className="form-control ">               

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
                    <input type="password" placeholder="Password" className="input input-bordered w-full"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setPassword(e.target.value)
                            }
                        }}
                    />
                    {error.password && (
                        <ErrorText text={error.password} />
                    )}
                </div>

                <div className="mt-2">
                    <a className="text-sm link text-[#949ca8] link-hover link-primary cursor-pointer" href={'/forgot-password'}>Forgot password</a>
                </div>

                <div className="mt-10 text-left">

                    <button disabled={isLoading || isDisabled} className="btn btn-primary w-full mb-4"
                        onClick={() => {
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

                    <a className="text-sm link-hover link-primary cursor-pointer" href={'/onboaring/signup'}>Don't have an account?</a>
                </div>
            </form>

            {showToast && (
				<>
					{toastError && (
						<Toast type="error" text={toastErrorText} />
					)}
				</>
			)}
        </div>
    )
}