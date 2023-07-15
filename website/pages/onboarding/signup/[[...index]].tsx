import SEOHead from "@/comps/seohead";
import { SignUp } from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function page() {
    return (
        <main
			className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="Signup for tip.dev" />
	  

            <SignUp path="/onboarding/signup" routing="path" afterSignUpUrl={"/onboarding/profile"}  />

  		</main>
    )
}