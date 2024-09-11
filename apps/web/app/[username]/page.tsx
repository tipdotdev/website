import { Separator } from "@/components/ui/separator";
import UserPageAboutCard from "@/components/users-page/about-card";
import UserPageHeader from "@/components/users-page/header";

const mock_user: any = {
    id: "user_2jqzVYvh7W1WWOkGvU6agG1dY6e",
    externalId: null,
    username: "dickey",
    emailAddresses: [
        {
            pathRoot: "/me/email_addresses",
            emailAddress: "k@kyle.so",
            linkedTo: [],
            id: "idn_2jqzTGaK1D0vW5RDdZmEy8pug7O",
            verification: {
                pathRoot: "",
                status: "verified",
                strategy: "email_code",
                nonce: null,
                externalVerificationRedirectURL: null,
                attempts: 1,
                expireAt: "2024-07-28T01:26:41.560Z",
                error: null
            }
        }
    ],
    phoneNumbers: [],
    web3Wallets: [],
    externalAccounts: [],
    passkeys: [],
    samlAccounts: [],
    organizationMemberships: [],
    passwordEnabled: true,
    firstName: null,
    lastName: null,
    fullName: null,
    primaryEmailAddressId: "idn_2jqzTGaK1D0vW5RDdZmEy8pug7O",
    primaryEmailAddress: {
        pathRoot: "/me/email_addresses",
        emailAddress: "k@kyle.so",
        linkedTo: [],
        id: "idn_2jqzTGaK1D0vW5RDdZmEy8pug7O",
        verification: {
            pathRoot: "",
            status: "verified",
            strategy: "email_code",
            nonce: null,
            externalVerificationRedirectURL: null,
            attempts: 1,
            expireAt: "2024-07-28T01:26:41.560Z",
            error: null
        }
    },
    primaryPhoneNumberId: null,
    primaryPhoneNumber: null,
    primaryWeb3WalletId: null,
    primaryWeb3Wallet: null,
    imageUrl:
        "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yaXp6VzR1Umt0dDdWNVRnOXJWdVhJcjEyWXEiLCJyaWQiOiJ1c2VyXzJqcXpWWXZoN1cxV1dPa0d2VTZhZ0cxZFk2ZSJ9",
    hasImage: false,
    twoFactorEnabled: false,
    totpEnabled: false,
    backupCodeEnabled: false,
    publicMetadata: {
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
    },
    unsafeMetadata: {},
    createOrganizationEnabled: true,
    deleteSelfEnabled: true,
    lastSignInAt: "2024-09-11T19:34:02.449Z",
    updatedAt: "2024-09-11T19:34:02.477Z",
    createdAt: "2024-07-28T01:16:58.440Z",
    cachedSessionsWithActivities: null
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
