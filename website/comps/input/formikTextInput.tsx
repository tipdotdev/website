import { FaCaretRight, FaDiscord, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import Toast from "../toast";

export default function FomikTextInput(props:any) {

    return (
        <>
            <input type="text" placeholder={props.placeholder} className="input input-bordered w-full"
                onChange={(e) => {
                    props.onChange(e.target.value)
                }}
            />
        </>
    )
}