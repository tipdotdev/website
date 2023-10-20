import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function SocialMediaInputModal(props:any) {
    return (
        <dialog id={`${props.modalName}_modal`} className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box w-full shadow-sm shadow-black border border-zinc-700">
                <h3 className="font-bold text-lg">Enter your {props.socialName} Username</h3>
                <p className="text-sm text-zinc-300 mt-2">Do not include the @ symbol</p>

                <input type="text" placeholder="tipdev" className="input input-bordered w-full mt-10" value={props.socials[props.modalName]} 
                    onChange={(e) => {
                        props.setSocials({ ...props.socials, [props.modalName]: e.target.value })
                    }}
                />

                <button className="btn btn-primary w-full mt-5">Save</button>

            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}