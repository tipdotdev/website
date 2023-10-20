import SEOHead from '@/comps/seohead'
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useUser from '@/hooks/useUser'
import { FaAsterisk, FaCrosshairs, FaGithub, FaPlus } from 'react-icons/fa'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export default function Page() {

    const router = useRouter()
    const { saveToken } = useUser()

    const { code, state } = router.query

    useEffect(() => {
        if (code && state) {
            // auth()
        }
    }, [code, state])

    const auth = async () => {
        // const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/oauth/callback/github`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         code: code,
        //         state: state,
        //     })
        // })

        // const res = await req.json()

        // if (!req.ok) {
        //     console.log(res)
        //     // handle error
        // } else {

        //     // save token
        //     saveToken(res.token)
            
        //     if (res.finishOnboarding) {
        //         // redirect to onboarding
        //         router.push(`/onboarding/username?oauth=true&&user=${JSON.stringify(res.user)}`)
        //     } else {
        //         // redirect to dashboard
        //         router.push(`/dashboard`)
        //     }

        // }
    }
	
  	return (
		<main
			className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev" />
	  
            {/* <span className="loading loading-spinner loading-md"></span> */}

            <div className="flex flex-row justify-center items-center ">
                <Image src={`/images/webp/logo-round.webp`} alt='Tip.dev logo' width={100} height={100} className='mr-3 border-zinc-700 border rounded-full shadow-md shadow-black' />

                <span className='loading loading-dots text-zinc-400 mt-2'></span>

                <Image src={`/images/webp/google-logo-bg.webp`} alt='Google logo' width={100} height={100} className='ml-3 border-zinc-700 border rounded-full shadow-md shadow-black' />
            </div>

            <p className="text-3xl font-semibold text-center mt-8">Linking Google account</p>
            <p className="text-sm text-center mt-2 text-zinc-400">This may take a second</p>


        
  		</main>
	)
}