import { Inter } from "next/font/google";
import useUser from "@/hooks/useUser"
import SEOHead from "@/comps/seohead";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserTipPage from "@/comps/userTipPage";

const inter = Inter({ subsets: ['latin'] })

export default function Page() {

    // get the params
    const { username } = useRouter().query

    // get the user
    const { user } = useUser()

    // get the stuff after the ? in the url
    const query = useRouter().asPath.split("?")[1]

    const [viewer, setViewer] = useState(null as any)
    useEffect(() => {
        setViewer(user)
    }, [user])

    const [pageUser, setPageUser] = useState(null as any)

    // get the page data
    const getData = async () => {
        if (!username) return

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res.status == 200) {
            const data = await res.json()

            setPageUser(data.user)
        } else {
            window.location.href = "/404"
        }
    }

    // add a page view
    const addPageView = async () => {
        if (!pageUser) return

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/analytics/pageviews/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: pageUser.user_id,
                page: "tip"
            })
        })
    }

    useEffect(() => {
        getData()
    }, [username])

    useEffect(() => {
        addPageView()
    }, [pageUser])

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center pb-10 ${inter.className}`} data-theme="dracula">

            <SEOHead title={`{$} ${username}`} />  

            <UserTipPage pageUser={pageUser} user={viewer} query={query} />

        </main>
    )
}