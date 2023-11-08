import { useEffect, useState } from "react"
import { FaCamera, FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { TbDiscountCheckFilled } from "react-icons/tb"
import { Inter } from "next/font/google";
import OnboardingNav from "@/comps/onboardingNavbar";
import SEOHead from "@/comps/seohead";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import ErrorText from "@/comps/input/errorText";
import SocialMediaInputModal from "@/comps/modals/socialMediaInputModal";
import useModal from "@/hooks/useModal";

const inter = Inter({ subsets: ['latin'] })

export default function page() {

    const { token, isAuthLoading, isSignedIn, user } = useUser()
    const router = useRouter()
    const { openModal } = useModal()

    const { redirect_uri } = router.query

    useEffect(() => {
        if (isSignedIn == false && isAuthLoading == false) {
            window.location.href = "/signin"
        }
    }, [isSignedIn])

    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [website, setWebsite] = useState("")
    const [socials, setSocials] = useState({} as any)
    const [avatar, setAvatar] = useState(null as any)

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({} as any)
    const [validUsername, setValidUsername] = useState(false)


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

    useEffect(() => {
        if (username.length > 0) {
            checkUsernameAvailability()
        }
    }, [username])

    const onboardProfile = async () => {

        setIsLoading(true)

        // check if they entered any data
        if (!name && !about && !website && !socials) {
            // we do this to make sure we dont get an api error from sending an empty object
            if (redirect_uri) {
                window.location.href = redirect_uri as string
            } else {
                window.location.href = "/onboarding/payout"
            }
            
            setIsLoading(false)
            return
        }

        // post to the api
        let data:any = {
            name: name,
            bio: about,
            website: website,
            socials: socials,
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/update/me`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                data: data
            })
        }) 

        if (avatar) {
            // upload the avatar
            const formData = new FormData()
            formData.append('file', avatar)

            const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/upload/avatar`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (res.status == 200 && res2.status == 200) {
                if (redirect_uri) {
                    window.location.href = redirect_uri as string
                } else {
                    window.location.href = "/onboarding/payout"
                }
                setIsLoading(false)
            } else {
                setIsLoading(false)
                alert('error')
            }
        } else {
            if (res.status == 200) {
                if (redirect_uri) {
                    window.location.href = redirect_uri as string
                } else {
                    window.location.href = "/onboarding/payout"
                }
                setIsLoading(false)
            } else {
                setIsLoading(false)
                alert('error')
            }
        }

    }

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
            <SEOHead title="{$} | Onboarding" />

            <OnboardingNav step={2} />

            <h1 className="text-4xl font-bold mt-20">Complete your profile</h1>

            <div className="form-control w-full max-w-sm">

                <div className="flex flex-col justify-center items-center">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-primary border-dashed rounded-full cursor-pointer
                            hover:bg-base-200 mt-10
                        ">
                        <div className="flex flex-col items-center justify-center">

                            {avatar || user?.pictures?.avatar ? (
                                <div className="avatar">
                                    <div className="w-full rounded-full">
                                        {user?.pictures?.avatar && !avatar ? (
                                            <img src={user?.pictures?.avatar}/>
                                        ) : (
                                            <img src={URL.createObjectURL(avatar)}/>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <FaCamera className="text-4xl text-zinc-300" />
                                </>
                            )}

                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => {if (e.target.files) setAvatar(e.target.files[0])}} />
                            
                    </label>

                    <p className="mt-5 font-code text-zinc-300">Add Avatar</p>
                </div>
                                
                <div className="mt-10">
                    <label className="label">
                        <span className="label-text text-md font-code">What's your name?</span>
                    </label>
                    <input type="text" placeholder="John Doe" className="input input-bordered w-full max-w-sm" value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>

                <div className="mt-5">
                    <label className="label">
                        <span className="label-text text-md font-code">About you ({about.length}/100)</span>
                    </label>
                    <textarea maxLength={100} className="textarea textarea-bordered h-24 w-full max-w-sm" placeholder="Hey, welcome to my tip.dev page! Tips help me continue to make cool stuff!"
                        onChange={(e) => {
                            setAbout(e.target.value)
                        }}
                    />
                </div>

                <div className="mt-5">
                    <label className="label">
                        <span className="label-text text-md font-code">Website link</span>
                    </label>
                    <input type="text" placeholder="https://tip.dev" className="input input-bordered w-full max-w-sm"
                        onChange={(e) => {
                            setWebsite(e.target.value)
                        }}
                    />
                </div>

                <div className="mt-5">
                    <label className="label">
                        <span className="label-text text-md font-code">Link socials</span>
                    </label>
                    
                    <div className="flex flex-row items-center justify-between">
                        <button className="btn btn-ghost"
                            onClick={() => openModal('twitter')}
                        >

                            {socials.twitter ? (
                                // put the twitter icon and a little checkmark
                                <div className="indicator">
                                    <FaTwitter className="text-2xl text-zinc-200" />
                                    <TbDiscountCheckFilled className="text-2xl text-primary indicator-item indicator-bottom" />
                                </div>
                            ) : (
                                <FaTwitter className="text-2xl text-zinc-200" />
                            )}

                        </button>

                        <button className="btn btn-ghost"
                            onClick={() => openModal('github')}
                        >
                            
                            {socials.github ? (
                                // put the twitter icon and a little checkmark
                                <div className="indicator">
                                    <FaGithub className="text-2xl text-zinc-200" />
                                    <TbDiscountCheckFilled className="text-2xl text-primary indicator-item indicator-bottom" />
                                </div>
                            ) : (
                                <FaGithub className="text-2xl text-zinc-200" />
                            )}

                        </button>

                        <button className="btn btn-ghost"
                            onClick={() => openModal('instagram')}
                        >
                            
                            {socials.instagram ? (
                                // put the twitter icon and a little checkmark
                                <div className="indicator">
                                    <FaInstagram className="text-2xl text-zinc-200" />
                                    <TbDiscountCheckFilled className="text-2xl text-primary indicator-item indicator-bottom" />
                                </div>
                            ) : (
                                <FaInstagram className="text-2xl text-zinc-200" />
                            )}

                        </button>

                        <button className="btn btn-ghost"
                            onClick={() => openModal('linkedin')}
                        >
                            
                            {socials.linkedin ? (
                                // put the twitter icon and a little checkmark
                                <div className="indicator">
                                    <FaLinkedin className="text-2xl text-zinc-200" />
                                    <TbDiscountCheckFilled className="text-2xl text-primary indicator-item indicator-bottom" />
                                </div>
                            ) : (
                                <FaLinkedin className="text-2xl text-zinc-200" />
                            )}

                        </button>
                    </div>

                    <button disabled={
                        isLoading
                    } className="btn btn-primary w-full mt-12 mb-12"
                        onClick={() => {
                            onboardProfile()
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

            {/* twitter modal */}
            <SocialMediaInputModal
                modalName="twitter"
                socialName="Twitter"
                socials={socials}
                setSocials={setSocials}
            />

            {/* github modal */}
            <SocialMediaInputModal
                modalName="github"
                socialName="GitHub"
                socials={socials}
                setSocials={setSocials}
            />

            {/* instagram modal */}
            <SocialMediaInputModal
                modalName="instagram"
                socialName="Instagram"
                socials={socials}
                setSocials={setSocials}
            />

            {/* linkedin modal */}
            <SocialMediaInputModal
                modalName="linkedin"
                socialName="LinkedIn"
                socials={socials}
                setSocials={setSocials}
            />

        </main>
    )
}