import { FaArrowCircleLeft, FaBars, FaGithub, FaGripVertical, FaUserCircle } from "react-icons/fa";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";

export default function GoogleLoginButton() {

    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const signin = async () => {

        setIsDisabled(true)
        setIsLoading(true)

        // request a state from the server
        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/oauth/state`)

        const res = await req.json()

        if (!req.ok) {
            // handle error
            console.log('error')
            return
        }

        const scopes = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"

        const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=token&scope=${scopes}&state=${res.state}`

        // redirect to github oauth
        window.location.href = oauthUrl

    }

    return (
        <button className="btn btn-block btn-md btn-neutral"
            onClick={() => signin()}
            disabled={isDisabled}
        >   
            {isLoading ? (
                <div className="loading loading-spinner loading-md" ></div>
            ) : (
                <img src="/images/webp/google-logo.webp" alt="Google Logo" className="mr-2 w-5 h-5" />
            )}

            <p className="normal-case">Continue with Google</p>
        </button>
    )
}