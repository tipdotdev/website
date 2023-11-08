import { FaApple, FaArrowCircleLeft, FaBars, FaGithub, FaGripVertical, FaUserCircle } from "react-icons/fa";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";

export default function AppleLoginButton() {

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

        const scopes = "read:user,user:email"

        const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=${scopes}&state=${res.state}&allow_signup=true`

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
                <FaApple className="mr-2 text-xl" />
            )}

            <p className="normal-case">Continue with Apple</p>
        </button>
    )
}