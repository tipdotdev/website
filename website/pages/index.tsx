import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seohead'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import ComingSoon from '@/comps/comingSoon'
import HomeHero from '@/comps/homePage/hero'
import Footer from '@/comps/footer'
import HomeStats from '@/comps/homePage/stats'
import HomeAbout from '@/comps/homePage/about'
import ComingSoonNavbar from '@/comps/comingSoon/navbar'
import SmallFooter from '@/comps/footer/small'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const [showComingSoon, setShowComingSoon] = useState(true)
	
  	return (
		<main
			className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev | Coming Soon" />
	  

			{showComingSoon ? 

				<>
					<ComingSoonNavbar />
					<ComingSoon />
					<SmallFooter />
				</>

			: 

				<>
	  				<Navbar />	
					<HomeHero />
					<HomeStats />
					<HomeAbout />
					<Footer />
				</>

			}

			

  		</main>
	)
}