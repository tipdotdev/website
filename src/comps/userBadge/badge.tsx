import { FaEnvelope, FaExternalLinkAlt, FaHeart, FaIcons, FaSquare } from "react-icons/fa"
import Avatar from "../avatar"

export default function Badge(props:any) {

    const badge = props.badge

    return (    
        <div>  
            <div className="flex flex-row items-center">
                <img src={badge?.image} className="w-10 h-10 object-cover" />
            </div>
        </div>
    )
}