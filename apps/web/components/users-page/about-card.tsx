import GitHubIcon from "@/public/icons/github-icon.svg";
import InstagramIcon from "@/public/icons/instagram-icon.svg";
import LinkedInIcon from "@/public/icons/linkedin-icon.svg";
import TwitchIcon from "@/public/icons/twitch-icon.svg";
import TwitterIcon from "@/public/icons/twitter-icon.svg";
import YouTubeIcon from "@/public/icons/youtube-icon.svg";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function UserPageAboutCard({ user }: { user: any }) {
    const socialIconCn =
        "h-6 w-6 fill-foreground/60 hover:fill-foreground/100 transition-colors duration-200";
    const hasMetadata = user.publicMetadata;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-serif text-xl font-bold">
                    About {user.username}
                </CardTitle>
                <CardDescription>
                    {user.publicMetadata.bio || "We don't know much about them..."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-start space-y-4">
                    {user.publicMetadata.website && (
                        <Link
                            href={user.publicMetadata.website}
                            target="_blank"
                            className="text-foreground/60 hover:text-foreground text-md flex flex-row items-center gap-2 transition-all duration-200 hover:underline"
                        >
                            <LinkIcon className="h-4 w-4" />
                            <span>{user.publicMetadata.website.split("://")[1]}</span>
                        </Link>
                    )}

                    <div className="flex flex-row items-center gap-4">
                        {hasMetadata && (
                            <>
                                {user.publicMetadata.socials.map((social: any, index: any) => (
                                    <Link
                                        href={social.url}
                                        target="_blank"
                                        key={social.name + "-" + index}
                                    >
                                        {social.name == "github" && (
                                            <GitHubIcon className={socialIconCn} />
                                        )}
                                        {social.name == "linkedin" && (
                                            <LinkedInIcon className={socialIconCn} />
                                        )}
                                        {social.name == "twitter" && (
                                            <TwitterIcon className={socialIconCn} />
                                        )}
                                        {social.name == "instagram" && (
                                            <InstagramIcon className={socialIconCn} />
                                        )}
                                        {social.name == "twitch" && (
                                            <TwitchIcon className={socialIconCn} />
                                        )}
                                        {social.name == "youtube" && (
                                            <YouTubeIcon className={socialIconCn} />
                                        )}
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
