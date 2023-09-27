import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seohead'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import Toast from '@/comps/toast'
import DashboardFooter from '@/comps/dashboardFooter'
import ComingSoon from '@/comps/comingSoon'
import HomeHero from '@/comps/homePage/hero'
import Footer from '@/comps/footer'
import HomeStats from '@/comps/homePage/stats'
import HomeAbout from '@/comps/homePage/about'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const [showComingSoon, setShowComingSoon] = useState(true)
	
  	return (
		<main
			className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev" />
	  

			{showComingSoon ? 

				<>
					<ComingSoon />
					<DashboardFooter />
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