import { FaEnvelope, FaExternalLinkAlt, FaHeart, FaLink, FaSquare } from "react-icons/fa"
import Avatar from "../avatar"
import Header from "./header"
import abbrNum from "@/utils/abbrNumber"
import SocialsDisplay from "./socials"
import TipBox from "./tipBox"

export default function UserTipPage(props:any) {

    const pageUser = props.pageUser
    const user = props.user

    return (
        <div className="flex flex-col h-full w-full items-center pb-10 sm:gap-10 gap-4 ">

            <Header pageUser={pageUser} user={user} />

            <div className="grid md:grid-cols-4 grid-cols-2 gap-2 xl:w-3/4 w-full sm:px-8 px-2">

                <div className="col-span-2 row-span-2 flex flex-row justify-between bg-base-200 p-5 rounded-xl">

                    <TipBox pageUser={pageUser} user={user} query={props.query} />

                </div>

                <div className="col-span-2 flex flex-col bg-base-200 p-5 rounded-xl">

                    <div className="flex flex-row justify-between items-center w-full">
                        
                        <div className="flex flex-col">
                            <p className="text-3xl font-bold">{pageUser?.username}</p>
                            {/* <p className="text-md text-zinc-400">{pageUser?.name || null}</p> */}
                            <a href={`https://tip.dev/${pageUser?.username}`} className={`text-md mt-1 font-code link link-hover ${

                                `
                                    ${pageUser?.page?.accent == 'primary' && `link-primary`}
                                    ${pageUser?.page?.accent == 'red' && `hover:text-red-400`}
                                    ${pageUser?.page?.accent == 'blue' && `hover:text-blue-400`}
                                    ${pageUser?.page?.accent == 'green' && `hover:text-green-400`}
                                    ${pageUser?.page?.accent == 'yellow' && `hover:text-yellow-400`}
                                    ${pageUser?.page?.accent == 'purple' && `hover:text-purple-400`}
                                    ${pageUser?.page?.accent == 'orange' && `hover:text-orange-400`}
                                    ${pageUser?.page?.accent == 'white' && `hover:text-white`}
                                    ${pageUser?.page?.accent == 'gray' && `hover:text-gray-400`}
                                `

                            } text-zinc-400`}>tip.dev/{pageUser?.username}</a>
                        </div>
                        
                        <div className="flex flex-col">
                            <p className="text-xl font-bold justify-end text-zinc-400">{abbrNum(pageUser?.followerCount, 2) || 0} Followers</p>
                            <p className="text-md justify-end text-zinc-400">{abbrNum(pageUser?.subscriberCount, 2) || 0} Subscribers</p>
                        </div>

                    </div>
                    
                    {pageUser?.bio && (
                        <div className="flex flex-col w-full mt-5">
                            <p className="text-xl font-bold text-zinc-400">About</p>
                            <p className="text-md text-white">{pageUser?.bio}</p>
                        </div>
                    )}

                    <div className="mt-5">
                        {pageUser?.website && (
                            <div className="flex flex-row items-center gap-2 mb-2">
                                <FaLink className="text-lg text-zinc-400" />
                                <a href={pageUser?.website} target="_blank" className="text-md text-zinc-400 link link-hover">{pageUser?.website}</a>
                            </div>
                        )}
                        <SocialsDisplay pageUser={pageUser} />
                    </div>

                </div>

            </div>
            
        </div>
    )
}