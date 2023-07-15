import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seohead'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  	return (
		<main
			className={`flex min-h-screen flex-col justify-center items-center px-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev" />
	  
	  		{/* <Navbar />	 */}

			<img src="/logo-no-bg-v3.png" className="h-36 w-fit" />

			<h1 className="text-xl font-code mt-5 text-zinc-300">coming soon</h1>

  		</main>
	)
}