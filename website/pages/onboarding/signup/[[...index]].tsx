import OnboardingNav from "@/comps/onboardingNavbar";
import SEOHead from "@/comps/seohead";
import SignupForm from "@/comps/signupForm";
import useUser from "@/hooks/useUser";
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
	  		<SEOHead title="Signup for tip.dev" />

			{/* <OnboardingNav step={1} /> */}

            {/* <SignUp path="/onboarding/signup" routing="path" afterSignUpUrl={"/onboarding/profile"}  /> */}

			<SignupForm />

  		</main>
    )
}