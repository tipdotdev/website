import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function DeleteAccountModal(props:any) {
    return (
        <dialog id="delete_modal" className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box w-full shadow-sm shadow-black border border-zinc-700">
                <h3 className="font-bold text-2xl">Confirm account deletion</h3>
                <p className="text-sm text-zinc-400 mt-2">This action is irreversible. All account data will be deleted permanatly. Some anonymous data will be persisted for buisness purposes.</p>
                
                <label className="label">
                    <span className="label-text text-lg mt-10">Type "Delete my account" to continue</span>
                </label>
                <input type="text" placeholder="Delete my account" className="input input-bordered w-full"
                    onChange={(e) => {
                        props.setConfirmDeleteText(e.target.value)
                    }}
                />

                <button className="btn btn-error w-full mt-10" disabled={props.confirmDeleteText !== "Delete my account"} onClick={() => {
                    props.deleteAccount()
                }}>Delete Account</button>

            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}