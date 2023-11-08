import { useEffect, useState } from "react"
import { FaArrowRight, FaCamera, FaEye, FaEyeSlash, FaGithub, FaInstagram, FaLinkedin, FaSquare, FaTwitter } from "react-icons/fa"
import Avatar from "../avatar"
import InfoTooltip from "../infoTooltip"
import { TbDiscountCheckFilled } from "react-icons/tb"
import ChangePasswordModal from "../modals/changePasswordModal"
import DeleteAccountModal from "../modals/deleteAccountModal"
import SocialMediaInputModal from "../modals/socialMediaInputModal"
import useModal from "@/hooks/useModal"
import ErrorModal from "../modals/errorModal"
import ErrorText from "../input/errorText"
import Toast from "../toast"

export default function DashboardProfile(props:any) {

    const user = props.user
    const token = props.token

    useEffect(() => {
        if (!user) return

        setUsername(user?.username || null)
        setName(user?.name || null)
        setBio(user?.bio || null)
        setSocials(user?.socials || {})
        setWebsite(user?.website || null)
        setAccentSelected(user?.page?.accent || 'primary')
    }, [user])  

    const { openModal } = useModal()

    const [error, setError] = useState(null as any)
    const [isLoading, setIsLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState("")

    const [newAvatar, setNewAvatar] = useState(null as any)
    const [newBanner, setNewBanner] = useState(null as any)

    const [name, setName] = useState(user?.name || null as any)
    const [username, setUsername] = useState(user?.username || null as any)
    const [usernameError, setUsernameError] = useState(null as any)
    const [validUsername, setValidUsername] = useState(false)
    const [newUsername, setNewUsername] = useState(null as any)
    const [bio, setBio] = useState(user?.bio || null as any)
    const [accentSelected, setAccentSelected] = useState('primary' as any)

    const [socials, setSocials] = useState(user?.socials || {})
    const [website, setWebsite] = useState(user?.website || null as any)

    useEffect(() => {
        if (error) {
            openModal('error')
        }
    }, [error])

    const uploadAvatar = async () => {
        if (!newAvatar) return
        setIsLoading(true)

        const formData = new FormData()
        formData.append('file', newAvatar)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/upload/avatar`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.status == 200) {
            setNewAvatar(null)
            window.location.reload()
        } else {
            setError({
                message: "Something went wrong."
            })
        }

        setIsLoading(false)

    }

    const uploadBanner = async () => {
        if (!newBanner) return
        setIsLoading(true)

        const formData = new FormData()
        formData.append('file', newBanner)

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/upload/banner`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.status == 200) {
            setNewBanner(null)
            window.location.reload()
        } else {
            setError({
                message: "Something went wrong."
            })
        }
        setIsLoading(false)
    }

    const checkUsernameAvailability = async () => {
        if (newUsername?.length == 0 || newUsername == null || newUsername == undefined || newUsername == "") {
            setValidUsername(false)
            setUsernameError({
                ...error,
                username: null
            })
            return
        }

        let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/check/${newUsername}`)
        if (req.status === 200) {
            setValidUsername(true)
            setUsernameError({
                ...error,
                username: null
            })
        } else {
            let data = await req.json()
            setValidUsername(false)
            setUsernameError({
                ...error,
                username: data
            })
        }
    }

    const updateProfile = async (type:string) => {
        setIsLoading(true)

        let data = {} as any
        let page = {} as any

        if (type == 'name') {
            data.name = name
        } else if (type == 'bio') {
            data.bio = bio
        } else if (type == 'website') {
            data.website = website
        } else if (type == 'accent') {
            page.accent = accentSelected
            data.page = page
        } else if (type == 'socials') {
            data.socials = socials
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/update/me`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                data
            })
        })

        if (res.status != 200) { 
            setError({
                message: "Try again later!"
            })
        } else {
            setShowToast(true)
            setToastText("Successfully updated profile")
			setTimeout(() => {
				setShowToast(false)
			}, 3000)

        }

        setIsLoading(false)
        return
    }

    useEffect(() => {
        if (newUsername?.length == 0 || newUsername == null || newUsername == undefined || newUsername == "") {
            setValidUsername(false)
            setUsernameError({
                ...error,
                username: null
            })
            return
        }

        checkUsernameAvailability()
    }, [newUsername])

    useEffect(() => {
        if (socials == user?.socials) return
        updateProfile('socials')
    }, [socials])

    if (props.isAuthLoading || !user) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full">
                <span className="loading loading-spinner loading-md"></span>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full ml-10 mb-10">
            <div className="flex-col bg-base-100 w-full rounded-xl items-center">

                <div className="grid grid-cols-4 gap-2">

                    <div className="col-span-4 flex flex-col bg-base-200 p-5 justify-center rounded-xl">

                        <h1 className="text-4xl font-bold">Profile</h1>
                        <p className="text-zinc-400 font-semibold mt-1">Personalize your public profile</p>

                    </div>

                    <div className="col-span-4 flex flex-col bg-base-200 p-5 justify-center rounded-xl">

                        <h1 className="text-2xl font-bold">Images</h1>

                        <div className="flex flex-col mt-5 w-full">
                            <label className="flex flex-row items-center rounded-xl cursor-pointer
                                hover:bg-base-100 transition duration-300 ease-in-out p-6
                            ">
                                <div className="flex flex-col">

                                    {newAvatar || user.pictures?.avatar ? (
                                        <div className="avatar mr-2">
                                            <div className="rounded-full w-24">
                                                <img src={!newAvatar ? user.pictures?.avatar : URL.createObjectURL(newAvatar)}/>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <FaCamera className="text-4xl text-zinc-300" />
                                        </>
                                    )}

                                </div>

                                <div className="flex flex-col ml-5">
                                    <p className="text-xl font-bold">Avatar</p>
                                    <p className="text-zinc-400 font-semibold mt-1">Click to upload</p>
                                </div>

                                <FaArrowRight className="ml-auto text-2xl text-zinc-300" />

                                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => {if (e.target.files) setNewAvatar(e.target.files[0])}} />
                                
                            </label>
                            {newAvatar && (
                                <button className="btn btn-primary mt-5" disabled={!newAvatar} onClick={() => {
                                    uploadAvatar()
                                }}>
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col mt-0 w-full">
                            <label className="flex flex-row items-center rounded-xl cursor-pointer
                                hover:bg-base-100 transition duration-300 ease-in-out p-6
                            ">
                                <div className="flex flex-col w-1/2">

                                    {newBanner || user.pictures?.banner ? (
                                        <div className="mr-2">
                                            <div className="rounded-xl w-full">
                                                <img src={!newBanner ? user.pictures?.banner : URL.createObjectURL(newBanner)} className="w-full aspect-banner object-cover object-center rounded-xl"/>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="w-full border-2 border-zinc-700 border-dashed h-48 rounded-xl">
                                            <div className="flex flex-col justify-center items-center w-full h-full">
                                                <FaCamera className="text-4xl text-zinc-300" />
                                            </div>
                                        </div>
                                    )}

                                </div>

                                <div className="flex flex-col ml-5 ">
                                    <p className="text-xl font-bold">Banner</p>
                                    <p className="text-zinc-400 font-semibold mt-1">Click to upload</p>
                                </div>

                                <FaArrowRight className="ml-auto text-2xl text-zinc-300" />

                                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => {if (e.target.files) setNewBanner(e.target.files[0])}} />
                                
                            </label>
                            {newBanner && (
                                <button className="btn btn-primary mt-5" disabled={!newBanner} onClick={() => {
                                    uploadBanner()
                                }}>
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            )}
                        </div>

                    </div>

                    <div className="col-span-2 flex row-span-2 flex-col bg-base-200 p-5 justify-center rounded-xl">

                        <h1 className="text-2xl font-bold">About you</h1>

                        <div className="mt-2">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Username</span>
                                <InfoTooltip text={`This is how people will identify you on tip.dev. Your profile page will be accessible from tip.dev/${newUsername != null ? newUsername : username}`} />
                            </label>
                            <div className="join w-full">
                                <input type="text" placeholder="Username" className="input input-bordered w-full join-item" value={newUsername != null ? newUsername : username}
                                    onChange={(e) => {
                                        setNewUsername(e.target.value)
                                    }}
                                />
                                <button className="btn join-item btn-primary" disabled={
                                    newUsername == user?.username || newUsername == null || !validUsername
                                }>
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            </div>
                            <ErrorText text={usernameError?.username} />
                        </div>

                        <div className="mt-2">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Name</span>
                                
                                <InfoTooltip text="As of right now, your name is private. We plan on making it public on your profile page soon." />
                            </label>
                            <div className="flex join">
                                <input type="text" placeholder="Name" className="input input-bordered join-item w-full" value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />
                                <button className="btn join-item btn-primary" disabled={
                                    name == user?.name || name == null
                                }
                                    onClick={() => {
                                        updateProfile('name')
                                    }}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Bio - {bio?.length || 0}/100</span>
                            </label>
                            <textarea 
                                className="textarea h-32 w-full rounded-lg font-normal textarea-bordered textarea-md" 
                                placeholder="Tell us about yourself"
                                onChange={(e) => setBio(e.target.value)}
                                style={{resize: "none"}}
                                maxLength={100}
                                value={bio}
                            />
                            <button className="btn btn-primary w-full mt-2" disabled={
                                bio == user?.bio || bio == null || bio.length < 1
                            }
                                onClick={() => {
                                    updateProfile('bio')
                                }}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>

                    </div>

                    <div className="col-span-2 row-span-1 flex flex-col bg-base-200 p-5 rounded-xl">

                        <h1 className="text-2xl font-bold">Social media</h1>

                        <div className="mt-2">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Website</span>
                            </label>
                            <div className="join w-full">
                                <input type="text" placeholder="Website" className="input input-bordered w-full join-item" value={website}
                                    onChange={(e) => {
                                        setWebsite(e.target.value)
                                    }}
                                />
                                <button className="btn join-item btn-primary rounded-r-lg" disabled={
                                    website == null || website.length < 8 || website == user?.website
                                }
                                    onClick={() => {
                                        updateProfile('website')
                                    }}
                                >
                                    {isLoading ? (
                                        <span className="loading loading-spinner loading-sm"></span>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-row items-center mt-5">
                            <button className="btn btn-ghost"
                                onClick={() => openModal('twitter')}
                            >

                                {socials.twitter ? (
                                    // put the twitter icon and a little checkmark
                                    <div className="indicator">
                                        <FaTwitter className="text-3xl text-zinc-200" />
                                        <TbDiscountCheckFilled className="text-2xl text-primary indicator-item indicator-bottom" />
                                    </div>
                                ) : (
                                    <FaTwitter className="text-3xl text-zinc-200" />
                                )}

                            </button>

                            <button className="btn btn-ghost"
                                onClick={() => openModal('github')}
                            >
                                
                                {socials.github ? (
                                    // put the twitter icon and a little checkmark
                                    <div className="indicator">
                                        <FaGithub className="text-3xl text-zinc-200" />
                                        <TbDiscountCheckFilled className="text-2xl text-primary indicator-item indicator-bottom" />
                                    </div>
                                ) : (
                                    <FaGithub className="text-3xl text-zinc-200" />
                                )}

                            </button>

                            <button className="btn btn-ghost"
                                onClick={() => openModal('instagram')}
                            >
                                
                                {socials.instagram ? (
                                    // put the twitter icon and a little checkmark
                                    <div className="indicator">
                                        <FaInstagram className="text-3xl text-zinc-200" />
                                        <TbDiscountCheckFilled className="text-2xl text-primary indicator-item indicator-bottom" />
                                    </div>
                                ) : (
                                    <FaInstagram className="text-3xl text-zinc-200" />
                                )}

                            </button>

                            <button className="btn btn-ghost"
                                onClick={() => openModal('linkedin')}
                            >
                                
                                {socials.linkedin ? (
                                    // put the twitter icon and a little checkmark
                                    <div className="indicator">
                                        <FaLinkedin className="text-3xl text-zinc-200" />
                                        <TbDiscountCheckFilled className="text-2xl text-primary indicator-item indicator-bottom" />
                                    </div>
                                ) : (
                                    <FaLinkedin className="text-3xl text-zinc-200" />
                                )}

                            </button>
                        </div>


                    </div>

                    <div className="col-span-2 row-span-1 flex flex-col bg-base-200 p-5 rounded-xl">

                        <h1 className="text-2xl font-bold">Theme</h1>

                        <div className="mt-2">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Accent color</span>
                            </label>
                            <div className="w-full flex flex-row gap-4 flex-wrap mt-2">
                                <div
                                    onClick={() => setAccentSelected("primary")}
                                    className={`${accentSelected == 'primary' ? "outline outline-2 outline-offset-2 outline-white" : "hover:opacity-40"} transition-all ease-in-out duration-150 bg-primary rounded-full w-10 h-10 cursor-pointer`}
                                />
                                <div
                                    onClick={() => setAccentSelected("red")}
                                    className={`${accentSelected == 'red' ? "outline outline-2 outline-offset-2 outline-white" : "hover:opacity-40"} transition-all ease-in-out duration-150 bg-red-400 rounded-full w-10 h-10 cursor-pointer`}
                                />
                                <div
                                    onClick={() => setAccentSelected("blue")}
                                    className={`${accentSelected == 'blue' ? "outline outline-2 outline-offset-2 outline-white" : "hover:opacity-40"} transition-all ease-in-out duration-150 bg-blue-400 rounded-full w-10 h-10 cursor-pointer`}
                                />
                                <div
                                    onClick={() => setAccentSelected("green")}
                                    className={`${accentSelected == 'green' ? "outline outline-2 outline-offset-2 outline-white" : "hover:opacity-40"} transition-all ease-in-out duration-150 bg-green-400 rounded-full w-10 h-10 cursor-pointer`}
                                />
                                <div
                                    onClick={() => setAccentSelected("yellow")}
                                    className={`${accentSelected == 'yellow' ? "outline outline-2 outline-offset-2 outline-white" : "hover:opacity-40"} transition-all ease-in-out duration-150 bg-yellow-400 rounded-full w-10 h-10 cursor-pointer`}
                                />
                                <div
                                    onClick={() => setAccentSelected("purple")}
                                    className={`${accentSelected == 'purple' ? "outline outline-2 outline-offset-2 outline-whitee" : "hover:opacity-40"} transition-all ease-in-out duration-150 bg-purple-400 rounded-full w-10 h-10 cursor-pointer`}
                                />
                                <div
                                    onClick={() => setAccentSelected("orange")}
                                    className={`${accentSelected == 'orange' ? "outline outline-2 outline-offset-2 outline-white" : "hover:opacity-40"} transition-all ease-in-out duration-150 bg-orange-400 rounded-full w-10 h-10 cursor-pointer`}
                                />  
                                <div
                                    onClick={() => setAccentSelected("white")}
                                    className={`${accentSelected == 'white' ? "outline outline-2 outline-offset-2 outline-white" : "hover:opacity-40"} transition-all ease-in-out duration-150 bg-white rounded-full w-10 h-10 cursor-pointer`}
                                />
                                <div
                                    onClick={() => setAccentSelected("gray")}
                                    className={`${accentSelected == 'gray' ? "outline outline-2 outline-offset-2 outline-white" : "hover:opacity-40"} transition-all ease-in-out duration-150 bg-gray-400 rounded-full w-10 h-10 cursor-pointer`}
                                />
                            </div>
                            <button className="btn btn-primary w-full mt-4" disabled={
                                accentSelected == user?.page?.accent || accentSelected == null
                            }
                                onClick={() => {
                                    updateProfile('accent')
                                }}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>


                    </div>
                    
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

            {/* Error Modal */}
            <ErrorModal
               error={error || { message: ':(' }}
               buttonText="Ok"
               buttonHref=""
            />

            {showToast && (
				<Toast type="success" text={toastText} />
			)}

        </div>
    )

}