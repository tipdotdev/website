import { FaEnvelope, FaExternalLinkAlt, FaHeart, FaSquare } from "react-icons/fa"
import Avatar from "../avatar"
import { TbExternalLink, TbHeart, TbMessage } from "react-icons/tb"

export default function IncomeEventDashboard(props:any) {
    const event = props.event
    const date = new Date(event.date * 1000).toLocaleDateString('en-US') + " " + new Date(event.date * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    return (
        <div className="text-center flex flex-row p-5 bg-base-300/50 rounded-xl items-center justify-between">

            <div className="flex flex-row items-center">
                <div className="w-24 mr-8">
                    <Avatar user={event.from} />
                </div>

                <div className="flex flex-col justify-start items-start gap-2"> 
                    <p className="text-xl font-code text-white/50">{event.from.username || event.from.name || "Someone"} gave you</p>
                    <h1 className="text-5xl font-bold">{event.amount}</h1>

                    <p className="text-xl font-code text-white/50">{event.message ? "\"" + event.message + "\"" : "No Message" }</p>

                    <div className="flex flex-row justify-start items-center">
                        <FaSquare className={`w-5 h-5 text-primary/50 mr-2`} />
                        <p className="text-lg font-code text-white/50">{event.type.name}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-start items-start ml-5">

                <div className="flex flex-row justify-end gap-2 w-full items-center mb-5">
                    <div className="tooltip tooltip-left tooltip-rounded" data-tip="Send a heart">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart w-6 h-6 mr-2 hover:text-red-400 cursor-pointer transition-all ease-in-out duration-150" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                    </div>

                    <div className="tooltip tooltip-left tooltip-rounded" data-tip="Send a message">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-message w-6 h-6 mr-2 hover:text-blue-400 cursor-pointer transition-all ease-in-out duration-150" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-external-link w-6 h-6 mr-2 hover:text-white/50 cursor-pointer transition-all ease-in-out duration-150" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" /><path d="M11 13l9 -9" /><path d="M15 4h5v5" /></svg>
                </div>

                <div className="flex flex-col text-right justify-center items-end gap-1">
                    <p className="text-md font-code text-white/50">{date}</p>
                    <p className="text-xs font-code text-white/30">{event.id}</p>
                </div>

            </div>

        </div>
    )
}