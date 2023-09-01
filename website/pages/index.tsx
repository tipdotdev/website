import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seohead'
import { Inter } from 'next/font/google'
import { FaCaretRight, FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import Toast from '@/comps/toast'
import DashboardFooter from '@/comps/dashboardFooter'
import axios from 'axios';
import ComingSoon from '@/comps/comingSoon'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
	
  	return (
		<main
			className={`flex min-h-screen flex-col justify-center items-center px-10 py-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev" />
	  
	  		{/* <Navbar />	 */}

			<ComingSoon />

			<DashboardFooter />

  		</main>
	)
}