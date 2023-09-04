import { FaEnvelope, FaExternalLinkAlt, FaHeart, FaSquare } from "react-icons/fa"
import Avatar from "../avatar"
import Badge from "../userBadge/badge"
import { TbDiscountCheckFilled } from "react-icons/tb"

export default function Header(props:any) {

    const pageUser = props.pageUser
    const isOwner = props.isOwner
    const user = props.user

    return (
        <div className="flex flex-col w-full justify-center items-center mb-20">
            <div className="flex flex-col w-[99%] top-2 absolute">

                {pageUser?.pictures?.banner == null ? (
                    <div className="w-full h-64 bg-base-200 rounded-xl"></div>
                ) : (
                    <img src={pageUser?.pictures?.banner} className="w-full h-[20rem] object-cover object-center rounded-xl" />
                )}

                <img src={pageUser?.pictures?.avatar} className="w-36 h-36 object-cover rounded-full -mt-20 ml-5 border-[6px] border-base-100" />
                
                {isOwner ? (
                    <div className="flex flex-col w-full items-end object-cover -mt-[5.8rem] pr-10 ">
                        <button className="btn btn-neutral rounded-full border-[6px] border-base-100 text-xl normal-case btn-lg justify-center">Edit Profile</button>
                    </div>
                ) : (
                    <>
                        {user?.following?.includes(pageUser.user_id) ? (
                            <div className="flex flex-col w-full items-start object-cover -mt-[5.8rem] pl-44 ">
                                <button className="btn btn-neutral rounded-full border-[6px] border-base-100 text-xl normal-case btn-lg justify-center" onMouseOver={(e) => {
                                    (e.target as HTMLButtonElement).innerHTML = "Unfollow"
                                    // set it back to "Follow" after the mouse leaves
                                    e.target.addEventListener("mouseleave", () => {
                                        (e.target as HTMLButtonElement).innerHTML = "Following"
                                    })
                                }}>Following</button>
                            </div>
                        ) : (
                            <div className="flex flex-col w-full items-start object-cover -mt-[5.8rem] pl-44 ">
                                <button className="btn btn-primary rounded-full border-[6px] border-base-100 text-xl normal-case btn-lg justify-center">Follow</button>
                            </div>
                        )}
                    </>
                )}

            </div>
        </div>
    )
}