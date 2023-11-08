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

export default function DashboardAccount(props:any) {

    const user = props.user
    const token = props.token
    const logout = props.logout

    const { openModal } = useModal()

    const [error, setError] = useState(null as any)

    const [email, setEmail] = useState(user?.email || null as any)
    const [validEmail, setValidEmail] = useState(false)
    const [password, setPassword] = useState("" as any)
    const [newPassword, setNewPassword] = useState("" as any)
    const [showPassword, setShowPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    const [confirmDeleteText, setConfirmDeleteText] = useState("")

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
            setError({
                message: "Error deleting account. Please try again."
            })
        }
    }

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

                        <h1 className="text-4xl font-bold">Account</h1>
                        <p className="text-zinc-400 font-semibold mt-1">Manage your account information</p>

                    </div>

                    <div className="col-span-4 row-span-1 flex flex-col bg-base-200 p-5 rounded-xl">

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

            {/* delete confirm modal */}
            <DeleteAccountModal
                confirmDeleteText={confirmDeleteText}
                setConfirmDeleteText={setConfirmDeleteText}
                deleteAccount={deleteAccount}
            />

            {/* Change password modal */}
            <ChangePasswordModal 
                showPassword={showPassword}
                showNewPassword={showNewPassword}
                password={password}
                newPassword={newPassword}
                setPassword={setPassword}
                setNewPassword={setNewPassword}
                validPassword={validPassword}
                setValidPassword={setValidPassword}
            />

            {/* Error Modal */}
            <ErrorModal
               error={error || { message: ':(' }}
               buttonText="Ok"
               buttonHref=""
            />

        </div>
    )

}