import OnboardingNav from "@/comps/onboardingNavbar";
import SEOHead from "@/comps/seohead";
import SignupForm from "@/comps/signupForm";
import VerifyEmail from "@/comps/signupForm/verifyEmail";
import useUser from "@/hooks/useUser";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function page() {
	const { token, isAuthLoading, isSignedIn } = useUser()
    const [showVerify, setShowVerify] = useState(false)

    // get the page query
    // const query = useRouter().asPath.split("?")[1]

    // useEffect(() => {
    //     if (query) {
    //         const verify = query.split("=")[1]
    //         console.log(verify)
    //         if (verify == "true") {
    //             setShowVerify(true)
    //         }
    //     }
    // }, )

    useEffect(() => {
        setTimeout(() => {
            if (isSignedIn && !showVerify ) {
                window.location.href = "/dashboard"
            }
        }, 1000)
    }, [isSignedIn])

    return (
        <main
			className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	

	  		<SEOHead title="Signup for tip.dev" />

            {showVerify ? (
                <VerifyEmail setShowVerify={setShowVerify} token={token} />
            ) : 
			    <SignupForm showVerify={showVerify} setShowVerify={setShowVerify} />
            }

  		</main>
    )
}