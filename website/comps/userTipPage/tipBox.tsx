import { useState } from "react"
import { FaDollarSign } from "react-icons/fa"
import ErrorText from "../input/errorText"

export default function TipBox(props:any) {

    const pageUser = props.pageUser
    const user = props.user

    const [tipType, setTipType] = useState("One-Time")
    const [tipAmount, setTipAmount] = useState(5)
    const [tipName, setTipName] = useState("")
    const [tipMessage, setTipMessage] = useState("")
    const [tipLoading, setTipLoading] = useState(false)
    const [error, setError] = useState({} as any)

    // validate tip amount
    const validateTipAmount = () => {
        // first make sure it is > 5
        if (tipAmount < 5) {
            setError({
                ...error,
                tipAmount: "Tip amount must be at least $5"
            })
            return false
        }

        // then make sure it is less than 1000
        if (tipAmount > 1000) {
            setError({
                ...error,
                tipAmount: "Tip amount must be less than $1,000"
            })
            return false
        }

        // then make sure it is a number
        if (isNaN(tipAmount)) {
            setError({
                ...error,
                tipAmount: "Tip amount must be a number"
            })
            return false
        }

        // then make sure it is not a decimal
        if (tipAmount % 1 != 0) {
            setError({
                ...error,
                tipAmount: "Tip amount must be a whole number"
            })
            return false
        }

        // if all checks pass, return true
        return true
    }

    return (    
        <div className="flex flex-col w-full">

            <div className="flex flex-row items-center">
                <p className="text-2xl font-bold">Support {pageUser?.username}</p>
            </div>  

            <div className="flex flex-row items-center mt-5 w-full gap-2">
                
                <div className={`rounded-xl w-full p-4 cursor-pointer hover:border-primary transition-all ease-in-out duration-150 text-center
                    ${tipType === "One-Time" ? (
                        "border-2 border-primary bg-primary/20 text-primary"
                    ) : (
                        "border-2 border-zinc-800 bg-base-100 text-zinc-400"
                    )}
                `} 
                    onClick={() => setTipType("One-Time")}
                >
                    <p className="text-xl font-bold">One-Time</p>
                </div>

                <div className={`rounded-xl w-full p-4 cursor-pointer hover:border-primary transition-all ease-in-out duration-150 text-center
                    ${tipType === "Monthly" ? (
                        "border-2 border-primary bg-primary/20 text-primary"
                    ) : (
                        "border-2 border-zinc-800 bg-base-100 text-zinc-400"
                    )}
                `} 
                    onClick={() => setTipType("Monthly")}
                >
                    <p className="text-xl font-bold">Monthly</p>
                </div>

            </div>

            <div className="flex flex-col mt-5">
                <div className="join items-center rounded-xl bg-base-100 pl-6">
                    <FaDollarSign className="text-xl -mr-4" />
                    <input 
                        type="text" 
                        className="input input-lg w-full rounded-xl bg-transparent font-bold placeholder:font-bold text-xl placeholder:text-xl  focus:border-transparent focus:ring-transparent ring-transparent ring-0 focus:ring-0 outline-none focus:outline-none border-none outline-0 hover:border-zinc-800 hover:border-2 transition-all ease-in-out duration-150"  
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
                    className="input input-lg w-full rounded-xl mt-5 font-bold placeholder:font-bold text-xl placeholder:text-xl"  
                    placeholder="Enter your name or nickname"
                    onChange={(e) => setTipName(e.target.value)}
                />

                <textarea 
                    className="textarea mt-5 h-32 rounded-xl placeholder:text-xl placeholder:font-bold font-bold text-xl" 
                    placeholder="Leave a public message"
                    onChange={(e) => setTipMessage(e.target.value)}
                    style={{resize: "none"}}
                    maxLength={500}
                />

                <button className="btn btn-primary btn-md  flex flex-row w-full mt-5 normal-case text-xl"
                    disabled={tipLoading || tipAmount < 5 }
                >
                    Tip {tipAmount.toLocaleString('en-us', {minimumFractionDigits: 0, maximumFractionDigits: 0, style: 'currency', currency: 'USD'}) || 0} {tipType == "Monthly" ? "/mo" : ""}
                </button>
                
            </div>
            
        </div>
    )
}