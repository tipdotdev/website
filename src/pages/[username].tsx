import { Inter } from "next/font/google";
import useUser from "@/hooks/useUser"
import SEOHead from "@/comps/seohead";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserTipPage from "@/comps/userTipPage";
import TipPageFooter from "@/comps/userTipPage/footer";

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps = (async (context:any) => {
    
    const username = context.query.username
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

    let data = null

    if (res.status == 200) {
        data = await res.json()
    }

    return {
        props: {
            data
        }
    }
})

export default function Page(props:any) {

    // get the params
    const { username } = useRouter().query

    // get the user
    const { user } = useUser()

    // get the stuff after the ? in the url
    const query = useRouter().asPath.split("?")[1]
    const router = useRouter()

    const [viewer, setViewer] = useState(null as any)
    useEffect(() => {
        setViewer(user)
    }, [user])

    const [pageUser, setPageUser] = useState(null as any)
    const [isLoading, setIsLoading] = useState(true)

    // get the page data
    useEffect(() => {
        if (!props.data) {
            // redirect to 404
            router.push("/404")
            return
        }

        setPageUser(props.data.user)
        setIsLoading(false)
    }, [props.data])

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
        addPageView()
    }, [pageUser])

    if (isLoading || !pageUser) {
        return (
            <main className={`flex min-h-screen flex-col justify-center items-center ${inter.className}`} data-theme="dracula">

                <span className="loading loading-spinner loading-md"></span>

            </main>
        )
    }

    return (
        <main className={`flex min-h-screen flex-col justify-center items-center ${inter.className}`} data-theme="dracula">

            <SEOHead title={`{$} ${username}`} />  

            <UserTipPage pageUser={pageUser} user={viewer} query={query} />
            
            <TipPageFooter />
        </main>
    )
}