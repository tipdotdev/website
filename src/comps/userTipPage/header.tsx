import { FaEnvelope, FaExternalLinkAlt, FaHeart, FaSquare } from "react-icons/fa"
import Avatar from "../avatar"
import Badge from "../userBadge/badge"
import { TbDiscountCheckFilled } from "react-icons/tb"

export default function Header(props:any) {

    const pageUser = props.pageUser
    const user = props.user

    const isOwner = user?.user_id == pageUser?.user_id

    return (
        <div className="flex flex-col w-full justify-center items-center mt-2">
            <div className="flex flex-col w-[99%]">

                {pageUser?.pictures?.banner == null ? (
                    <div className="w-full aspect-banner bg-base-200 rounded-xl"></div>
                ) : (
                    <img src={pageUser?.pictures?.banner} className="w-full aspect-banner object-center object-cover rounded-xl" />
                )}

                <img src={pageUser?.pictures?.avatar} className="sm:w-36 w-16 sm:h-36 h-16 object-cover rounded-full sm:-mt-20 -mt-8 ml-5 border-[6px] border-base-100" />
                
                {isOwner ? (
                    <div className="flex flex-col w-full items-start object-cover sm:-mt-[5.8rem] -mt-[4rem] sm:pl-44 pl-32">
                        <a className="btn btn-neutral rounded-full border-[6px] border-base-100 text-xl normal-case btn-lg justify-center" href="/dashboard/profile">Edit Profile</a>
                    </div>
                ) : (
                    <>
                        {user?.following?.includes(pageUser.user_id) ? (
                            <div className="flex flex-col w-full items-start object-cover sm:-mt-[5.8rem] -mt-[4rem] sm:pl-44 pl-32">
                                <button className="btn btn-neutral rounded-full border-[6px] border-base-100 text-xl normal-case btn-lg justify-center" onMouseOver={(e) => {
                                    (e.target as HTMLButtonElement).innerHTML = "Unfollow"
                                    // set it back to "Follow" after the mouse leaves
                                    e.target.addEventListener("mouseleave", () => {
                                        (e.target as HTMLButtonElement).innerHTML = "Following"
                                    })
                                }}>Following</button>
                            </div>
                        ) : (
                            <div className="flex flex-col w-full items-start object-cover sm:-mt-[5.8rem] -mt-[4rem] sm:pl-44 pl-32">
                                <button className={`btn ${
                                    `
                                        ${pageUser?.page?.accent == 'primary' && `btn-primary`}
                                        ${pageUser?.page?.accent == 'red' && `bg-red-400 hover:bg-red-500 text-zinc-800`}
                                        ${pageUser?.page?.accent == 'blue' && `bg-blue-400 hover:bg-blue-500 text-zinc-800`}
                                        ${pageUser?.page?.accent == 'green' && `bg-green-400 hover:bg-green-500 text-zinc-800`}
                                        ${pageUser?.page?.accent == 'yellow' && `bg-yellow-400 hover:bg-yellow-500 text-zinc-800`}
                                        ${pageUser?.page?.accent == 'purple' && `bg-purple-400 hover:bg-purple-500 text-zinc-800`}
                                        ${pageUser?.page?.accent == 'orange' && `bg-orange-400 hover:bg-orange-500 text-zinc-800`}
                                        ${pageUser?.page?.accent == 'white' && `bg-white hover:bg-gray-400 text-zinc-800`}
                                        ${pageUser?.page?.accent == 'gray' && `bg-gray-400 hover:bg-gray-500 text-zinc-800`}
                                    `
                                } rounded-full border-[6px] border-base-100 text-xl normal-case btn-lg justify-center`}>Follow</button>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}