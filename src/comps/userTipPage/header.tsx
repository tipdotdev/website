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
                        <button className="btn btn-neutral rounded-full border-[6px] border-base-100 text-xl normal-case btn-lg justify-center">Edit Profile</button>
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
                                <button className="btn btn-primary rounded-full border-[6px] border-base-100 text-xl normal-case btn-lg justify-center">Follow</button>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}