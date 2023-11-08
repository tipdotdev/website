import { FaDollarSign } from "react-icons/fa"
import ErrorText from "../input/errorText"
import { useState } from "react"

export default function TipBoxInfoForm(props:any) {
    const tipType = props.tipType
    const setTipType = props.setTipType
    const tipAmount = props.tipAmount
    const setTipAmount = props.setTipAmount
    const tipName = props.tipName
    const setTipName = props.setTipName
    const tipMessage = props.tipMessage
    const setTipMessage = props.setTipMessage
    const tipLoading = props.tipLoading
    const error = props.error
    const setError = props.setError
    const setStep = props.setStep
    const continueFunc = props.continue
    const email = props.email
    const setEmail = props.setEmail
    const validEmail = props.validEmail
    const pageUser = props.pageUser

    const accent = pageUser?.page?.accent

    return (
        <>
            <div className="flex flex-row items-center mt-5 w-full gap-2">
                
                <div className={`rounded-lg w-full p-4 cursor-pointer ${accent ? (
                    `
                        ${accent == 'primary' && `hover:border-primary`}
                        ${accent == 'red' && `hover:border-red-400`}
                        ${accent == 'blue' && `hover:border-blue-400`}
                        ${accent == 'green' && `hover:border-green-400`}
                        ${accent == 'yellow' && `hover:border-yellow-400`}
                        ${accent == 'purple' && `hover:border-purple-400`}
                        ${accent == 'orange' && `hover:border-orange-400`}
                        ${accent == 'white' && `hover:border-white`}
                        ${accent == 'gray' && `hover:border-gray-400`}
                    `
                    ): ""} transition-all ease-in-out duration-150 text-center
                    ${tipType === "One-Time" ? (
                        `
                            ${accent == 'primary' && `border-2 border-primary bg-primary/20 text-primary`}
                            ${accent == 'red' && `border-2 border-red-400 bg-red-400/20 text-red-400`}
                            ${accent == 'blue' && `border-2 border-blue-400 bg-blue-400/20 text-blue-400`}
                            ${accent == 'green' && `border-2 border-green-400 bg-green-400/20 text-green-400`}
                            ${accent == 'yellow' && `border-2 border-yellow-400 bg-yellow-400/20 text-yellow-400`}
                            ${accent == 'purple' && `border-2 border-purple-400 bg-purple-400/20 text-purple-400`}
                            ${accent == 'orange' && `border-2 border-orange-400 bg-orange-400/20 text-orange-400`}
                            ${accent == 'white' && `border-2 border-white bg-white/20 text-white`}
                            ${accent == 'gray' && `border-2 border-gray-400 bg-gray-400/20 text-gray-400`}
                        `
                    ) : (
                        "border-2 border-zinc-800 bg-base-100 text-zinc-400"
                    )}
                `} 
                    onClick={() => setTipType("One-Time")}
                >
                    <p className="text-xl font-bold">One-Time</p>
                </div>

                {/* <div className={`rounded-lg w-full p-4 cursor-pointer hover:border-primary transition-all ease-in-out duration-150 text-center
                    ${tipType === "Monthly" ? (
                        "border-2 border-primary bg-primary/20 text-primary"
                    ) : (
                        "border-2 border-zinc-800 bg-base-100 text-zinc-400"
                    )}
                `} 
                    onClick={() => setTipType("Monthly")}
                >
                    <p className="text-xl font-bold">Monthly</p>
                </div> */}

            </div>

            <div className="flex flex-col mt-5">
                <div className="join items-center rounded-lg bg-base-100 pl-6">
                    <FaDollarSign className="text-xl -mr-4" />
                    <input 
                        type="text" 
                        className="input input-lg w-full rounded-lg bg-transparent font-bold placeholder:font-bold text-xl placeholder:text-xl  focus:border-transparent focus:ring-transparent ring-transparent ring-0 focus:ring-0 outline-none focus:outline-none border-none outline-0 hover:border-zinc-800 hover:border-2 transition-all ease-in-out duration-150"  
                        placeholder="5"
                        onChange={(e) => {
                            if (e.target.value == "") {
                                setTipAmount(0)
                            } else {
                                setTipAmount(parseInt(e.target.value))
                            }
                        }}
                        value={tipAmount}
                    />
                </div>
                {error.tipAmount && (
                    <ErrorText text={error.tipAmount} />
                )}

                <input 
                    type="text" 
                    className="input input-lg w-full rounded-lg mt-5 font-bold placeholder:font-bold text-xl placeholder:text-xl"  
                    placeholder="Name or nickname"
                    onChange={(e) => setTipName(e.target.value)}
                />

                <div className="flex flex-col w-full">
                    <input 
                        type="email" 
                        className="input input-lg w-full rounded-lg mt-5 font-bold placeholder:font-bold text-xl placeholder:text-xl" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }} 
                    />

                    {error.email && (
                        <ErrorText text={error.email} />
                    )}
                </div>

                <textarea 
                    className="textarea mt-5 h-32 rounded-lg placeholder:text-xl placeholder:font-bold font-bold text-xl" 
                    placeholder="Leave a public message"
                    onChange={(e) => setTipMessage(e.target.value)}
                    style={{resize: "none"}}
                    maxLength={500}
                />

                <button className={`btn ${accent ? (
                    `
                        ${accent == 'primary' && `btn-primary`}
                        ${accent == 'red' && `bg-red-400 hover:bg-red-500 text-zinc-800`}
                        ${accent == 'blue' && `bg-blue-400 hover:bg-blue-500 text-zinc-800`}
                        ${accent == 'green' && `bg-green-400 hover:bg-green-500 text-zinc-800`}
                        ${accent == 'yellow' && `bg-yellow-400 hover:bg-yellow-500 text-zinc-800`}
                        ${accent == 'purple' && `bg-purple-400 hover:bg-purple-500 text-zinc-800`}
                        ${accent == 'orange' && `bg-orange-400 hover:bg-orange-500 text-zinc-800`}
                        ${accent == 'white' && `bg-white hover:bg-gray-400 text-zinc-800`}
                        ${accent == 'gray' && `bg-gray-400 hover:bg-gray-500 text-zinc-800`}
                    `
                ): ""} btn-lg  flex flex-row w-full mt-5 normal-case text-xl`}
                    disabled={tipLoading || tipAmount < 5 || !email || !validEmail } onClick={() => {
                        continueFunc()
                    }}
                >
                    Tip {tipAmount.toLocaleString('en-us', {minimumFractionDigits: 0, maximumFractionDigits: 0, style: 'currency', currency: 'USD'}) || 0} {tipType == "Monthly" ? "/mo" : ""}
                </button>
                
            </div>
        </>
    )
}