import { useState } from "react"
import { FaCamera, FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"
import { TbDiscountCheckFilled } from "react-icons/tb"
import { Inter } from "next/font/google";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";

const inter = Inter({ subsets: ['latin'] })

export default function page() {

    const { isLoaded, isSignedIn, user } = useUser();

    if (!isSignedIn) {
        <RedirectToSignIn />
    }

    const [name, setName] = useState("")
    const [about, setAbout] = useState("")
    const [website, setWebsite] = useState("")
    const [socials, setSocials] = useState({} as any)

    const [isLoading, setIsLoading] = useState(false)

    const openModal = (social: string) => {
        if (social == "twitter") {
            const modal = document.getElementById("twit_modal") as any
            modal?.showModal()
        } else if (social == "github") {
            const modal = document.getElementById("github_modal") as any
            modal?.showModal()
        } else if (social == "instagram") {
            const modal = document.getElementById("insta_modal") as any
            modal?.showModal()
        } else if (social == "linkedin") {
            const modal = document.getElementById("linkedin_modal") as any
            modal?.showModal()
        }
    }

    const onboardProfile = async () => {

        setIsLoading(true)

        // post to the api
        const res = await fetch("/api/onboarding/profile", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about,
                website: website,
                socials: socials,
            })
        })

        if (res.status == 200) {
            window.location.href = "/onboarding/payout"
        }

    }

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`} data-theme="dracula">
            <h1 className="text-4xl font-bold mt-12">Complete your profile</h1>

            <div className="form-control w-full max-w-xs">

                {/* <div className="flex flex-col justify-center items-center">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-primary border-dashed rounded-full cursor-pointer
                            hover:bg-base-200 mt-10
                        ">
                        <div className="flex flex-col items-center justify-center">

                            {avatar ? (
                                <div className="avatar">
                                    <div className="w-full rounded-full">
                                        <img src={URL.createObjectURL(avatar)}/>
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
                </div> */}
                                
                <div className="mt-10">
                    <label className="label">
                        <span className="label-text text-md font-code">What's your name?</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setName(e.target.value)
                            }
                        }}
                    />
                </div>

                <div className="mt-5">
                    <label className="label">
                        <span className="label-text text-md font-code">About you ({about.length}/100)</span>
                    </label>
                    <textarea maxLength={100} className="textarea textarea-bordered h-24 w-full max-w-xs" placeholder="Hey, welcome to my tip.dev page! Tips help me continue to make cool stuff!"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setAbout(e.target.value)
                            }
                        }}
                    />
                </div>

                <div className="mt-5">
                    <label className="label">
                        <span className="label-text text-md font-code">Website link</span>
                    </label>
                    <input type="text" placeholder="https://tip.dev" className="input input-bordered w-full max-w-xs"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setWebsite(e.target.value)
                            }
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

                    <button disabled={isLoading} className="btn btn-primary w-full mt-12 mb-12"
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
            <dialog id="twit_modal" className="modal">
                <form method="dialog" className="modal-box w-full">
                    <h3 className="font-bold text-lg">Enter your Twitter Username</h3>
                    <p className="text-sm text-zinc-300 mt-2">Do not include the @ symbol</p>

                    <input type="text" placeholder="tipdotdev" className="input input-bordered w-full mt-10"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setSocials({ ...socials, twitter: e.target.value })
                            } 
                        }}
                    />

                    <button className="btn btn-primary w-full mt-5">Save</button>

                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* github modal */}
            <dialog id="github_modal" className="modal">
                <form method="dialog" className="modal-box w-full">
                    <h3 className="font-bold text-lg">Enter your GitHub Username</h3>
                    <p className="text-sm text-zinc-300 mt-2">Do not include the @ symbol</p>

                    <input type="text" placeholder="tipdev" className="input input-bordered w-full mt-10"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setSocials({ ...socials, github: e.target.value })
                            } 
                        }}
                    />

                    <button className="btn btn-primary w-full mt-5">Save</button>

                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* instagram modal */}
            <dialog id="insta_modal" className="modal">
                <form method="dialog" className="modal-box w-full">
                    <h3 className="font-bold text-lg">Enter your Instagram Username</h3>
                    <p className="text-sm text-zinc-300 mt-2">Do not include the @ symbol</p>

                    <input type="text" placeholder="tipdev" className="input input-bordered w-full mt-10"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setSocials({ ...socials, instagram: e.target.value })
                            } 
                        }}
                    />

                    <button className="btn btn-primary w-full mt-5">Save</button>

                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* linkedin modal */}
            <dialog id="linkedin_modal" className="modal">
                <form method="dialog" className="modal-box w-full">
                    <h3 className="font-bold text-lg">Enter your LinkedIn Username</h3>
                    <p className="text-sm text-zinc-300 mt-2">Do not include the @ symbol</p>

                    <input type="text" placeholder="tipdev" className="input input-bordered w-full mt-10"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setSocials({ ...socials, linkedin: e.target.value })
                            } 
                        }}
                    />

                    <button className="btn btn-primary w-full mt-5">Save</button>

                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
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