import { useEffect, useState } from "react"
import { FaArrowRight, FaCamera, FaEye, FaEyeSlash, FaGithub, FaInstagram, FaLinkedin, FaSquare, FaTwitter } from "react-icons/fa"
import Avatar from "../avatar"
import InfoTooltip from "../infoTooltip"
import { TbDiscountCheckFilled } from "react-icons/tb"

export default function DashboardAccount(props:any) {

    const user = props.user
    const token = props.token
    const logout = props.logout

    const [newAvatar, setNewAvatar] = useState(null as any)
    const [newBanner, setNewBanner] = useState(null as any)

    const [name, setName] = useState(user?.name || null as any)
    const [username, setUsername] = useState(user?.username || null as any)
    const [bio, setBio] = useState(user?.bio || null as any)

    const [email, setEmail] = useState(user?.email || null as any)
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState("" as any)
    const [newPassword, setNewPassword] = useState("" as any)
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    const [socials, setSocials] = useState(user?.socials || {})
    const [website, setWebsite] = useState(user?.website || null as any)

    const [confirmDeleteText, setConfirmDeleteText] = useState("")

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
        } else if (social == "delete") {
            const modal = document.getElementById("delete_modal") as any
            modal?.showModal()
        } else if (social == "change_password") {
            const modal = document.getElementById("change_password_modal") as any
            modal?.showModal()
        }
    }

    const uploadAvatar = async () => {
        if (!newAvatar) return

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
            alert('error')
        }

    }

    const uploadBanner = async () => {
        if (!newBanner) return

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
            alert('error')
        }

    }

    const deleteAccount = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/delete/me`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        if (res.status == 200) {
            logout('/signin')
        } else {
            alert('error')
        }
    }

    return (
        <div className="flex flex-col w-full ml-10 mb-10">
            <div className="flex-col bg-base-100 w-full rounded-xl items-center">

                <div className="grid grid-cols-4 gap-2">

                    <div className="col-span-4 flex flex-col bg-base-200 p-5 justify-center rounded-xl">

                        <h1 className="text-4xl font-bold">Account</h1>
                        <p className="text-zinc-400 font-semibold mt-1">Manage your account information</p>

                    </div>

                    <div className="col-span-4 flex flex-col bg-base-200 p-5 justify-center rounded-xl">

                        <h1 className="text-2xl font-bold">Profile</h1>

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
                                }}>Save</button>
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
                                }}>Save</button>
                            )}
                        </div>

                    </div>

                    <div className="col-span-2 flex row-span-2 flex-col bg-base-200 p-5 justify-center rounded-xl">

                        <h1 className="text-2xl font-bold">Public Data</h1>

                        <div className="mt-5">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Name</span>
                                
                                <InfoTooltip text="Your name is displayed on your profile and on your tip page." />
                            </label>
                            <div className="flex join">
                                <input type="text" placeholder="Name" className="input input-bordered join-item w-full" value={name}
                                    onChange={(e) => {
                                        if (e.target.value.length > 0) {
                                            setName(e.target.value)
                                        }
                                    }}
                                />
                                <button className="btn join-item btn-primary" disabled={
                                    name == user?.name || name == null
                                }>Save</button>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Username</span>
                            </label>
                            <div className="join w-full">
                                <input type="text" placeholder="Username" className="input input-bordered w-full join-item" value={username}
                                    onChange={(e) => {
                                        if (e.target.value.length > 0) {
                                            setUsername(e.target.value)
                                        }
                                    }}
                                />
                                <button className="btn join-item btn-primary" disabled={
                                    username == user?.username || username == null
                                }>Save</button>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">About you</span>
                            </label>
                            <textarea 
                                className="textarea h-32 w-full rounded-lg font-normal textarea-bordered textarea-md" 
                                placeholder="Leave a public message"
                                onChange={(e) => setBio(e.target.value)}
                                style={{resize: "none"}}
                                maxLength={500}
                                value={bio}
                            />
                            <button className="btn btn-primary w-full mt-2" disabled={
                                bio == user?.bio || bio == null
                            }>Save</button>
                        </div>

                    </div>

                    <div className="col-span-2 row-span-1 flex flex-col bg-base-200 p-5 rounded-xl">

                        <h1 className="text-2xl font-bold">Social Media</h1>

                        <div className="mt-5">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Website</span>
                            </label>
                            <div className="join w-full">
                                <input type="text" placeholder="Website" className="input input-bordered w-full join-item" value={website}
                                    onChange={(e) => {
                                        if (e.target.value.length > 0) {
                                            setWebsite(e.target.value)
                                        }
                                    }}
                                />
                                <button className="btn join-item btn-primary rounded-r-lg" disabled={
                                    website == null || website.length < 8 || website == user?.website
                                }>Save</button>
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

                        <h1 className="text-2xl font-bold">Sensitive Data</h1>

                        <div className="mt-5">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Email</span>
                            </label>
                            <div className="join w-full">
                                <input type="email" placeholder="Email" className="input input-bordered w-full join-item" value={email}
                                    onChange={(e) => {
                                        if (e.target.value.length > 0) {
                                            setEmail(e.target.value)
                                        }
                                    }}
                                />
                                <button className="btn join-item btn-primary rounded-r-lg" disabled={
                                    email == user?.email || email == null
                                }>Save</button>
                            </div>
                        </div>

                        <div className="mt-2">
                            <label className="label items-center justify-normal">
                                <span className="label-text text-lg font-bold mr-2">Password</span>
                            </label>
                            <button className="btn btn-neutral w-full mt-2" onClick={() => openModal('change_password')}>Click to change</button>
                        </div>


                    </div>

                    
                    <div className="col-span-4 row-span-1 flex flex-col bg-base-200 p-5 justify-center rounded-xl">

                        <h1 className="text-2xl font-bold">Danger Zone</h1>

                        <div className="flex flex-row mt-7 justify-between gap-2">
                            <div className="flex flex-col w-1/2">
                                <p className="text-lg font-bold">Delete Account</p>
                                <p className="text-zinc-400 font-semibold">Delete your account and all associated data.</p>
                            </div>
                            <button className="btn btn-error" onClick={() => {
                                openModal("delete")
                            }}>Delete Account</button>
                        </div>

                        
                    </div>
                    
                </div>

                
            </div>

            {/* twitter modal */}
            <dialog id="twit_modal" className="modal">
                <form method="dialog" className="modal-box w-full">
                    <h3 className="font-bold text-lg">Enter your Twitter Username</h3>
                    <p className="text-sm text-zinc-300 mt-2">Do not include the @ symbol</p>

                    <input type="text" placeholder="tipdotdev" className="input input-bordered w-full mt-10" value={socials.twitter}
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

                    <input type="text" placeholder="tipdev" className="input input-bordered w-full mt-10" value={socials.github}
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

                    <input type="text" placeholder="tipdev" className="input input-bordered w-full mt-10" value={socials.instagram}
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

                    <input type="text" placeholder="tipdev" className="input input-bordered w-full mt-10" value={socials.linkedin} 
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

            {/* delete confirm modal */}
            <dialog id="delete_modal" className="modal">
                <form method="dialog" className="modal-box w-full">
                    <h3 className="font-bold text-2xl">Confirm account deletion</h3>
                    <p className="text-sm text-zinc-400 mt-2">This action is irreversible. All account data will be deleted permanatly. Some anonymous data will be persisted for buisness purposes.</p>
                    
                    <label className="label">
                        <span className="label-text text-lg mt-10">Type "Delete my account" to continue</span>
                    </label>
                    <input type="text" placeholder="Delete my account" className="input input-bordered w-full"
                        onChange={(e) => {
                            if (e.target.value.length > 0) {
                                setConfirmDeleteText(e.target.value)
                            } 
                        }}
                    />

                    <button className="btn btn-error w-full mt-10" disabled={confirmDeleteText !== "Delete my account"} onClick={() => {
                        deleteAccount()
                    }}>Delete Account</button>

                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Change password modal */}
            <dialog id="change_password_modal" className="modal">
                <form method="dialog" className="modal-box w-full">
                    <h3 className="font-bold text-2xl">Change your password</h3>
                    <p className="text-sm text-zinc-400 mt-2">Enter your current password and your new password.</p>

                    <div className="join w-full mt-10">
                        <input type={showPassword ? "text" : "password"} placeholder="Current Password" className="input w-full input-bordered join-item border-r-0 rounded-r-none" 
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

                    <div className="join w-full mt-6">
                        <input type={showNewPassword ? "text" : "password"} placeholder="New Password" className="input w-full input-bordered join-item border-r-0 rounded-r-none" 
                            onChange={(e) => {
                                if (e.target.value.length > 0) {
                                    setNewPassword(e.target.value)
                                }
                            }}
                        />
                        <p className="btn btn-ghost border-1 border-[#4e515a] border-l-0 rounded-lg rounded-l-none" onClick={() => {
                            setShowNewPassword(!showNewPassword)
                        }}>
                            {!showNewPassword ? (
                                <FaEye />
                            ) : (
                                <FaEyeSlash />
                            )}
                        </p> 
                    </div>

                    <button className="btn btn-primary w-full mt-10" disabled={password && newPassword && validPassword} onClick={() => {
                        // change password
                    }}>Change Password</button>

                </form>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    )

}