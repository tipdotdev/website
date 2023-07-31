import { UserProfile } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { FaSquare } from "react-icons/fa"

export default function DashboardAccount(props:any) {

    const user = props.user

    return (
        <div className="flex flex-col w-full ml-10 mb-10">
            <div className="flex-col bg-base-100 w-full rounded-xl items-center">

                <div className="grid grid-cols-4 gap-2">

                    <div className="col-span-4 flex flex-row justify-between items-center rounded-xl">
                        <UserProfile
                            appearance={{
                                elements: {
                                    card: "w-[165%] rounded-xl bg-base-200 p-5"
                                }
                            }}
                        />
                    </div>
                    
                </div>

                
            </div>
        </div>
    )

}