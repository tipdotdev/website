import SEOHead from "@/comps/seohead";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {

    const redirectPage = "https://discord.gg/DsxygKZe54"
    const router = useRouter()

    useEffect(() => {
        router.push(redirectPage)
    }, [])

    return (
        <main
			className={`flex min-h-screen flex-col justify-center items-center px-10`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="Tip.dev Discord" />

            <h1 className="text-xl text-center font-medium">Redirecting</h1>
            <span className="loading loading-dots loading-sm text-primary mt-2"></span>


            <div className="bg-base-200 text-white rounded-md p-2 mt-2 font-code">
                <a href={redirectPage} className="link link-hover">{redirectPage}</a>
            </div>

        </main>
    )
}