import { useEffect, useState } from "react"
import { FaCamera, FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { TbDiscountCheckFilled } from "react-icons/tb"
import { Inter } from "next/font/google";
import OnboardingNav from "@/comps/onboardingNavbar";
import SEOHead from "@/comps/seohead";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import ErrorText from "@/comps/input/errorText";

const inter = Inter({ subsets: ['latin'] })

export default function page() {

    const { token, isAuthLoading, isSignedIn } = useUser()
    const router = useRouter()

    const { oauth, user, redirect_uri } = router.query

    const [oauthData, setOauthData] = useState({} as any)

    useEffect(() => {
        if (isSignedIn == false && isAuthLoading == false) {
            window.location.href = "/signin"
        }
    }, [isSignedIn])

    useEffect(() => {
        if (user && oauth) {
            setUsername(JSON.parse(user as string).login)
            setOauthData(JSON.parse(user as string))
        }
    }, [user, oauth])

    const [username, setUsername] = useState(null as any)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({} as any)
    const [validUsername, setValidUsername] = useState(false)

    const checkUsernameAvailability = async () => {
        if (username?.length == 0 || username == null || username == undefined || username == "") {
            setValidUsername(false)
            setError({
                ...error,
                username: null
            })
            return
        }

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

    useEffect(() => {
        if (username?.length == 0 || username == null || username == undefined || username == "") {
            setValidUsername(false)
            setError({
                ...error,
                username: null
            })
            return
        }

        checkUsernameAvailability()
    }, [username])

    const onboardUsername = async () => {
        if (typeof window == "undefined") return

        if (username?.length == 0 || username == null || username == undefined || username == "") {
            (false)
            setError({
                ...error,
                username: "Username cannot be empty"
            })
            return
        }

        setIsLoading(true)

        const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/update/me`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                data: {
                    username: username
                }
            })
        }) 

        if (!req.ok) {
            console.log(await req.json())
            setIsLoading(false)
            alert('error - check console')
            return console.log(await req.json())
        }

        // if theres a redirect_uri, redirect to that, else redirect to onboarding/profile
        if (redirect_uri) {
            window.location.href = redirect_uri as string
        } else {
            window.location.href = "/onboarding/profile"
        }

    }

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
            <SEOHead title="{$} | Onboarding" />

            <OnboardingNav step={1} />

            <h1 className="text-4xl font-bold mt-0">Choose a username</h1>
            <p className="text-md mt-2 text-zinc-400 font-code">This will be your tip.dev page (tip.dev/username)</p>

            <div className="form-control w-full max-w-sm">
                <div className="flex flex-col justify-center items-center w-full">

                    <div className="mt-10 -mb-5 w-full justify-center items-center">
                        <label className="label">
                            <span className="label-text text-md font-code">Pick a username</span>
                        </label>
                        <input type="text" placeholder="Username" className="input input-bordered w-full" value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />

                        {error.username && (
                            <ErrorText text={error.username} />
                        )}

                        {validUsername && (
                            <p className="text-sm text-green-500 mt-2">Username is available!</p>
                        )}
                    </div>

                    <button disabled={
                        isLoading || !validUsername || username?.length == 0
                    } className="btn btn-primary w-full mt-12 mb-12"
                        onClick={() => {
                            onboardUsername()
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
            </div>
        </main>
    )
}

/*
<label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-primary border-dashed rounded-full cursor-pointer
                    hover:bg-base-200 mt-10
                ">
                    <div className="flex flex-col items-center justify-center">

                        {avatar ? (
                            <img src={URL.createObjectURL(avatar)} className="w-full h-full rounded-full" />
                        ) : (
                            <>
                                <FaCamera className="text-4xl text-zinc-300" />
                            </>
                        )}

                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={(e) => {if (e.target.files) setAvatar(e.target.files[0])}} />
                        
                </label>

                <p className="mt-5 font-code text-zinc-300">Add Avatar</p>
                */