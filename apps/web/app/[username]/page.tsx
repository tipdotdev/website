import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import UserPageAboutCard from "@/components/users-page/about-card";
import UserPageHeader from "@/components/users-page/header";
import type { UserType } from "@/types/user-type";

const mock_user: UserType = {
    user_id: "user_36692ee0-af5c-4661-adf6-30fca225f1b2",
    username: "dickey",
    name: "dickey",
    email: "kyle@dickey.gg",
    pictures: {
        avatar: "https://avatars.githubusercontent.com/u/14032461?v=4",
        banner: "https://avatars.githubusercontent.com/u/14032461?v=4"
    },
    created_at: 1710593767188,
    updated_at: 1710593767188,
    last_login: 1710593767188,
    page: {},
    bio: "I'm a software engineer, designer, and entrepreneur. I'm passionate about building products that help people.",
    socials: [
        {
            name: "github",
            url: "https://github.com/dickeyy"
        },
        {
            name: "linkedin",
            url: "https://www.linkedin.com/in/kyledickey/"
        },
        {
            name: "twitter",
            url: "https://twitter.com/dickeyy"
        },
        {
            name: "instagram",
            url: "https://www.instagram.com/dickeyy/"
        },
        {
            name: "twitch",
            url: "https://www.twitch.tv/dickeyy"
        },
        {
            name: "youtube",
            url: "https://www.youtube.com/channel/UC9Z1XWw1kmnvOOFsj6Bzy2g"
        }
    ],
    website: "https://dickey.gg"
};

// { params }: { params: { username: string } } <- for later
export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center px-2 py-2 sm:px-8">
            <div className="flex w-[75%] flex-col items-center justify-center">
                {/* header with avatar and banner */}
                <UserPageHeader user={mock_user} />

                <Separator className="my-8 bg-white/10" />

                <div className="grid w-full grid-cols-2 gap-2">
                    <UserPageAboutCard user={mock_user} />
                </div>
            </div>
        </main>
    );
}
