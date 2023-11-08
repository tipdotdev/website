import { useEffect, useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function SocialMediaInputModal(props:any) {
    const [value, setValue] = useState(props.socials[props.modalName])

    useEffect(() => {
        setValue(props.socials[props.modalName])
    }, [props.socials])

    return (
        <dialog id={`${props.modalName}_modal`} className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box w-full shadow-sm shadow-black border border-zinc-700">
                <h3 className="font-bold text-lg">Enter your {props.socialName} Username</h3>
                <p className="text-sm text-zinc-300 mt-2">Do not include the @ symbol</p>

                <input type="text" placeholder="tipdev" className="input input-bordered w-full mt-10" value={value} 
                    onChange={(e) => {
                        setValue(e.target.value)
                    }}
                />

                <button className="btn btn-primary w-full mt-5"
                    onClick={() => {
                        props.setSocials({ ...props.socials, [props.modalName]: value })
                    }}
                >Save</button>

            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}