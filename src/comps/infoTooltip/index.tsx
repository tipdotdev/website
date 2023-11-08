import { FaInfoCircle } from "react-icons/fa";

export default function InfoTooltip(props:any) {

    return (
        <div className={`tooltip text-left justify-start` + props.className } data-tip={props.text}>
            <FaInfoCircle className={`text-lg ${
                props.color ? props.color : "text-zinc-600"
            }`} />
        </div>
    )
}