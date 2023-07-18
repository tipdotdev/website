import Navbar from '@/comps/navbar'
import SEOHead from '@/comps/seohead'
import { Inter } from 'next/font/google'
import { FaCaretRight, FaCheck } from 'react-icons/fa'
import { useState } from 'react'
import Toast from '@/comps/toast'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

	const [ email, setEmail ] = useState("")
	const [ showToast, setShowToast ] = useState(false)
	const [ error, setError ] = useState(false)
	const [ errorText, setErrorText ] = useState("")

	const submitEmail = async () => {
		console.log(email)
		let req = await fetch("/api/newsletter/enter", {
			method: "POST",
			body: JSON.stringify({
				email: email
			})
		})
		console.log(req.status)
		if (req.status === 200) {
			setEmail("")
			setShowToast(true)

			setTimeout(() => {
				setShowToast(false)
			}, 5000)
		} else {
			setError(true)
			setErrorText("Error signing up")
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

			<div className="form-control mt-10">
				<div className="input-group border-2 rounded-lg border-zinc-500">
					<input type="text" placeholder="Sign up for our newsletter" className="input" value={email} onChange={(e) => {
						setEmail(e.target.value)
					}} />
					<button className="btn btn-ghost border" onClick={() => submitEmail()}>
						<FaCaretRight className="w-5 h-5" />
					</button>
				</div>
			</div>
			
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