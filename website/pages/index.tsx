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

	const [pfp, setPfp] = useState<any>(null)
	
  	return (
		<main
			className={`flex min-h-screen flex-col justify-center items-center px-10 py-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev" />
	  
	  		{/* <Navbar />	 */}

			<ComingSoon />
		

			{/* upload picture test form */}
			{/* <form onSubmit={async (e:any) => {
				e.preventDefault()

				const formData = new FormData()
				formData.append('file', e.target?.image?.files[0])

				const req = await fetch('http://localhost:8000/v1/upload/avatar', {
					method: 'POST',
					body: formData,
					headers: {
						'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.ZGlja2V5.kUCrABr2hSKkodYTpWN_EiHC9OaEzi6MpO6PMGWyx_0`
					}
				})

				if (req.status !== 200) {
					alert('error')
					return
				}

				const res = await req.json()

				if (res.message === 'success') {
					setPfp(res.url)
				}
			}}>
				<input type="file" name="image" />
				<input type="submit" />
			</form>

			{pfp && <img src={pfp} className='rounded-full' alt="pfp" />} */}

			<DashboardFooter />

  		</main>
	)
}