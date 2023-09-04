import { FaInfoCircle } from "react-icons/fa";

export default function InfoTooltip(props:any) {

    return (
        <div className="tooltip" data-tip={props.text}>
            <FaInfoCircle className="text-lg text-zinc-600" />
        </div>
    )
}