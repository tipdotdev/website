import SEOHead from "@/comps/seohead";
import SigninForm from "@/comps/signinForm";
import useUser from "@/hooks/useUser";
import { SignIn, SignUp } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ['latin'] })

export default function page() {
	const { token, isAuthLoading, isSignedIn } = useUser()

    useEffect(() => {
        if (isSignedIn) {
            window.location.href = "/dashboard"
        }
    }, [isSignedIn])

    return (
        <main
			className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="Signin to tip.dev" />
	  

            {/* <SignIn path="/signin" routing="path" /> */}
			<SigninForm />

  		</main>
    )
}