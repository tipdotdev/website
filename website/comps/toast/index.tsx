import React, { useState } from 'react';
import { FaCheck, FaExclamationTriangle, FaInfoCircle, FaSkull } from 'react-icons/fa';

export default function Toast(props: any) {
    
    if (props.type === "success") {
        return (
            <div className="toast toast-center flex sm:w-fit w-full">
                <div className="alert bg-success/20 text-success border-none backdrop-blur-md">
                    <FaCheck className="w-5 h-5 mr-2 sm:flex hidden" />
                    <span>{props.text}</span>
                </div>
            </div>
        )
    } else if (props.type === "error") {
        return (
            <div className="toast toast-center flex sm:w-fit w-full ">
                <div className="alert bg-error/20 text-error border-none backdrop-blur-md">
                    <FaSkull className="w-5 h-5 mr-2 sm:flex hidden" />
                    <span>{props.text}</span>
                </div>
            </div>
        )
    } else if (props.type === "warning") {
        return (
            <div className="toast toast-center flex sm:w-fit w-full">
                <div className="alert bg-warning/20 text-warning border-none backdrop-blur-md">
                    <FaExclamationTriangle className="w-5 h-5 mr-2 sm:flex hidden" />
                    <span>{props.text}</span>
                </div>
            </div>
        )
    } else if (props.type === "info") {
        return (
            <div className="toast toast-center flex sm:w-fit w-full">
                <div className="alert bg-info/20 text-info border-none backdrop-blur-md">
                    <FaInfoCircle className="w-5 h-5 mr-2 sm:flex hidden" />
                    <span>{props.text}</span>
                </div>
            </div>

        )
    } else {
        return (
            <></>
        )
    }

}