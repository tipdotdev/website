import { FaEnvelope, FaExternalLinkAlt, FaGithub, FaHeart, FaInstagram, FaLinkedin, FaSquare, FaTwitter } from "react-icons/fa"
import Avatar from "../avatar"
import Badge from "../userBadge/badge"
import { TbDiscountCheckFilled } from "react-icons/tb"

export default function SocialsDisplay(props:any) {

    const pageUser = props.pageUser

    return (
        <div className="flex flex-row gap-6">
            {pageUser?.socials?.twitter && (
                <a href={`https://twitter.com/${pageUser?.socials?.twitter}`} className="link link-hover link-primary text-zinc-400">
                    <FaTwitter className="text-2xl" />
                </a>
            )}

            {pageUser?.socials?.github && (
                <a href={`https://github.com/${pageUser?.socials?.github}`} className="link link-hover link-primary text-zinc-400">
                    <FaGithub className="text-2xl" />
                </a>
            )}

            {pageUser?.socials?.instagram && (
                <a href={`https://instagram.com/${pageUser?.socials?.instagram}`} className="link link-hover link-primary text-zinc-400">
                    <FaInstagram className="text-2xl" />
                </a>
            )}

            {pageUser?.socials?.linkedin && (
                <a href={`https://linkedin.com/in/${pageUser?.socials?.linkedin}`} className="link link-hover link-primary text-zinc-400">
                    <FaLinkedin className="text-2xl" />
                </a>
            )}
        </div>
    )
}