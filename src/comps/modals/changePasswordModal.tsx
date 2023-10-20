import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function ChangePasswordModal(props:any) {
    return (
        <dialog id="change_password_modal" className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box w-full shadow-sm shadow-black border border-zinc-700">
                <h3 className="font-bold text-2xl">Change your password</h3>
                <p className="text-sm text-zinc-400 mt-2">Enter your current password and your new password.</p>

                <div className="join w-full mt-10">
                    <input type={props.showPassword ? "text" : "password"} placeholder="Current Password" className="input w-full input-bordered join-item border-r-0 rounded-r-none" 
                        onChange={(e) => {
                            props.setPassword(e.target.value)
                        }}
                    />
                    <p className="btn btn-ghost border-1 border-[#4e515a] border-l-0 rounded-lg rounded-l-none" onClick={() => {
                        props.setShowPassword(!props.showPassword)
                    }}>
                        {!props.showPassword ? (
                            <FaEye />
                        ) : (
                            <FaEyeSlash />
                        )}
                    </p> 
                </div>

                <div className="join w-full mt-6">
                    <input type={props.showNewPassword ? "text" : "password"} placeholder="New Password" className="input w-full input-bordered join-item border-r-0 rounded-r-none" 
                        onChange={(e) => {
                            props.setNewPassword(e.target.value)
                        }}
                    />
                    <p className="btn btn-ghost border-1 border-[#4e515a] border-l-0 rounded-lg rounded-l-none" onClick={() => {
                        props.setShowNewPassword(!props.showNewPassword)
                    }}>
                        {!props.showNewPassword ? (
                            <FaEye />
                        ) : (
                            <FaEyeSlash />
                        )}
                    </p> 
                </div>

                <button className="btn btn-primary w-full mt-10" disabled={props.password && props.newPassword && props.validPassword} onClick={() => {
                    // change password
                }}>Change Password</button>

            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}