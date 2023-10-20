import { FaCaretRight, FaDiscord, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useEffect, useState } from "react";
import Toast from "../toast";
import FomikTextInput from "../input/formikTextInput";
import ErrorText from "../input/errorText";
import { TbDiscountCheckFilled } from "react-icons/tb";
import useUser from "../../hooks/useUser";
import OtpInput from 'react-otp-input';

export default function VerifyEmail(props:any) {

    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)

    const [ showToast, setShowToast ] = useState(false)
	const [ toastError, setToastError ] = useState(false)
	const [ toastErrorText, setToastErrorText ] = useState("")

    const { saveToken } = useUser()

    const verifyCode = async () => {
        setIsLoading(true) 

        let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userID: localStorage?.getItem("td:userID"),
                code: code 
            })
        })

        if (req.status === 200) {
            const data = await req.json()
            
            // save token
            saveToken(data.token)
            setIsLoading(false)

            // redirect 
            window.location.href = "/onboarding/username"
            
        } else {
            const data = await req.json()
            console.log(data)
            setShowToast(true)
            setToastError(data.error)
            setToastErrorText(data.error.message)
            setIsLoading(false)

            setTimeout(() => {
                setShowToast(false)
            }, 5000)
        }

        
    }

    useEffect(() => {
        if (code.length === 6) {
            setIsDisabled(false)
        }
    }, [code])

    return (
        <div className="w-full max-w-sm">

            <h1 className="text-4xl font-bold mt-12">Verify email</h1>
            <p className="text-lg mt-2 text-zinc-400">We've sent you an email with a code. Enter it below to continue.</p>

            <form onSubmit={(e) => { e.preventDefault() }} className="form-control ">               

                <div className="mt-10 text-white">
                    <OtpInput
                        value={code}
                        onChange={setCode}
                        numInputs={6}
                        renderSeparator={<span className="ml-1text-2xl"></span>}
                        renderInput={(props) => <input {...props} className={"mr-1 input input-bordered h-16 w-12 text-center text-2xl"} type={'text'} />}
                        containerStyle={{
                            width: "100%",
                        }}
                        inputStyle={{
                            width: "3rem",
                        }}
                    />
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