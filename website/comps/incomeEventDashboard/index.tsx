import { FaEnvelope, FaExternalLinkAlt, FaHeart, FaSquare } from "react-icons/fa"

export default function IncomeEventDashboard(props:any) {
    const event = props.event
    return (
        <div className="text-center flex flex-row p-5 bg-base-200 rounded-xl items-center justify-between">

            <div className="flex flex-row items-center">
                <img src={event.from.imageUrl} className="mask mask-circle w-24 mr-5" />

                <div className="flex flex-col justify-start items-start"> 
                    <p className="text-xl font-code text-zinc-400">{event.from.username} gave you</p>
                    <h1 className="text-5xl font-bold">{event.amount}</h1>

                    <div className="flex flex-row justify-start items-center  mt-2">
                        <FaSquare className={`w-5 h-5 text-primary/50 mr-2`} />
                        <p className="text-lg font-code text-zinc-400">{event.type.name}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-start items-start ml-5">
                <p className="text-xl font-code text-zinc-400">{event.date}</p>
                <p className="text-xl font-code text-zinc-400">{event.time}</p>

                <div className="flex flex-row justify-between w-full items-center mt-5">
                    <div className="tooltip tooltip-left tooltip-rounded" data-tip="Send a heart">
                        <FaHeart className="w-6 h-6 mr-2 hover:text-red-400 cursor-pointer transition-all ease-in-out duration-150" />
                    </div>

                    <div className="tooltip tooltip-left tooltip-rounded" data-tip="Send a message">
                        <FaEnvelope className="w-6 h-6 mr-2 hover:text-blue-400 cursor-pointer transition-all ease-in-out duration-150" />
                    </div>

                    <FaExternalLinkAlt className="w-6 h-6 mr-2 hover:text-zinc-400 cursor-pointer transition-all ease-in-out duration-150" />
                </div>
            </div>

        </div>
    )
}