import { FaEnvelope, FaExternalLinkAlt, FaGithub, FaHeart, FaInstagram, FaLinkedin, FaSquare, FaTwitter } from "react-icons/fa"
import Avatar from "../avatar"
import Badge from "../userBadge/badge"
import { TbDiscountCheckFilled } from "react-icons/tb"

export default function SocialsDisplay(props:any) {

    const pageUser = props.pageUser

    return (
        <div className="flex flex-row gap-6">
            {pageUser?.socials?.twitter && (
                <a href={`https://twitter.com/${pageUser?.socials?.twitter}`} target={"_blank"} className="link link-hover link-primary text-zinc-400 transition-all ease-in-out duration-150">
                    <FaTwitter className="text-2xl" />
                </a>
            )}

            {pageUser?.socials?.github && (
                <a href={`https://github.com/${pageUser?.socials?.github}`} target={"_blank"} className="link link-hover link-primary text-zinc-400 transition-all ease-in-out duration-150">
                    <FaGithub className="text-2xl" />
                </a>
            )}

            {pageUser?.socials?.instagram && (
                <a href={`https://instagram.com/${pageUser?.socials?.instagram}`} target={"_blank"} className="link link-hover link-primary text-zinc-400 transition-all ease-in-out duration-150">
                    <FaInstagram className="text-2xl" />
                </a>
            )}

            {pageUser?.socials?.linkedin && (
                <a href={`https://linkedin.com/in/${pageUser?.socials?.linkedin}`} target={"_blank"} className="link link-hover link-primary text-zinc-400 transition-all ease-in-out duration-150">
                    <FaLinkedin className="text-2xl" />
                </a>
            )}
        </div>
    )
}