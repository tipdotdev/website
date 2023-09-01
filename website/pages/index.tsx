import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seohead'
import { Inter } from 'next/font/google'
import { FaCaretRight, FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import Toast from '@/comps/toast'
import DashboardFooter from '@/comps/dashboardFooter'
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const [ email, setEmail ] = useState("")
	const [ showToast, setShowToast ] = useState(false)
	const [ error, setError ] = useState(false)
	const [ errorText, setErrorText ] = useState("")

	const submitEmail = async () => {
		let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/news/enter`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		if (req.status === 200) {
			setEmail("")
			setShowToast(true)
			setError(false)
			setErrorText("Successfully signed up")

			setTimeout(() => {
				setShowToast(false)
			}, 5000)
		} else {
			const data = await req.json()
			setError(true)
			setErrorText(data.error.message)
			setShowToast(true)

			setTimeout(() => {
				setShowToast(false)
			}, 5000)
		}

	}

  	return (
		<main
			className={`flex min-h-screen flex-col justify-center items-center px-10 py-10 ${inter.className}`}
	  		data-theme="dracula"
  		>	
	  		<SEOHead title="tip.dev" />
	  
	  		{/* <Navbar />	 */}

			<img src="/logo-no-bg-v3.png" className="h-36 w-48" />

			<h1 className="text-xl font-code mt-5 text-zinc-300">coming soon</h1>

			<form className="form-control mt-10" onSubmit={(e) => {
				e.preventDefault()
			}}>
				<div className='tooltip' data-tip="Enter your email">
					<div className="input-group border-2 rounded-lg border-zinc-500 w-full">
						<input type="text" placeholder="Get updates" className="input w-full pr-5" value={email} onChange={(e) => {
							setEmail(e.target.value)
						}} />
						<button className="btn btn-ghost border" onClick={() => submitEmail()}>
							<FaCaretRight className="w-5 h-5" />
						</button>
					</div>
				</div>

			</form>

			<DashboardFooter />
			
			{showToast && (
				<>
					{error && (
						<Toast type="error" text={errorText} />
					)}
					{!error && (
						<Toast type="success" text="Successfully signed up" />
					)}
				</>
			)}

  		</main>
	)
}