import { useState } from "react"
import Toast from "../toast"
import { IoClose } from "react-icons/io5"

export default function ColorDetailsModal(props:any) {

    const [showToast, setShowToast] = useState(false)
    const [toastText, setToastText] = useState("")

    const clickToCopy = (text:string) => {
        // copy text to clipboard
        navigator.clipboard.writeText(text)

        // show toast
        setShowToast(true)
        setToastText(`Copied ${text} to clipboard`)
        setTimeout(() => {
            setShowToast(false)
        }, 2000)
    }

    const varname = props.details?.varName || "undefined"
    const rgb = props.details?.rgb || "undefined"
    const hex = props.details?.hex || "undefined"
    const hsl = props.details?.hsl || "undefined"

    return (
        <dialog id={`colordetails_modal`} className="modal backdrop-blur-lg">
            <form method="dialog" className="modal-box w-full shadow-sm shadow-black border border-zinc-700">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                
                <h3 className="font-bold text-lg">Color Details</h3>
                <p className="text-sm text-zinc-400">Click on a value to copy it</p>

                <div className="flex sm:flex-row flex-col sm:justify-between justify-start sm:items-center mt-4 gap-4">
                    <div className="text-sm gap-2">
                        <p className="text-zinc-200">Variable Name: <span className="font-bold cursor-pointer link-primary link-hover text-white" onClick={() => clickToCopy(varname)}>{varname}</span></p>
                        <p className="text-zinc-200">HEX Value: <span className="font-bold cursor-pointer link-primary link-hover text-white" onClick={() => clickToCopy(hex)}>{hex}</span></p>
                        <p className="text-zinc-200">RGB Value: <span className="font-bold cursor-pointer link-primary link-hover text-white" onClick={() => clickToCopy(rgb)}>{rgb}</span></p>
                        <p className="text-zinc-200">HSL Value: <span className="font-bold cursor-pointer link-primary link-hover text-white" onClick={() => clickToCopy(hsl)}>{hsl}</span></p>
                    </div>

                    <div className={`sm:w-44 w-full h-24 rounded-lg bg-${varname}`}></div>
                </div>

                {/* <button className="btn btn-primary w-full mt-5"
                >Close</button> */}

            </form>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>

            {showToast && (
                <Toast type="success" text={toastText} />
            )}
        </dialog>
    )
}