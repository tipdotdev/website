import { FaCaretRight, FaDiscord, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import Toast from "../toast";

export default function ErrorText(props:any) {

    return (
        <>
            <p className="text-error text-sm mt-2">{props.text}</p>
        </>
    )
}