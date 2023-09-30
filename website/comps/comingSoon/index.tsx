import { FaArrowCircleRight, FaCaretRight, FaDiscord, FaTwitter } from "react-icons/fa";
import { useState } from "react";
import Toast from "../toast";

export default function ComingSoon() {
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
        <div className="hero min-h-screen w-screen bg-base-100
            bg-[url('/svg/grain.svg')]
            bg-blend-overlay
            bg-opacity-[10%]
        ">
            <div className="hero-content text-center ">
                <div className='
					absolute
					w-[20rem]
					sm:w-[40rem]
					sm:h-[20rem]
					h-[10rem]
					bg-gradient-to-r from-primary to-secondary
					rounded-full
					blur-[70px]
                    z-[-20]
                    opacity-40
				' />
                <div className="max-w-4xl z-0">
                    
                    <p className="sm:text-5xl text-2xl text-zinc-300 font-code mb-2">Coming Soon</p>

                    <h1 className="sm:text-8xl text-6xl font-bold">
                        Make <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">money</span> doing what you love
                    </h1>

                    <div className="flex flex-row gap-4 justify-center items-center mt-20 w-full">
                        
                        <form className="bg-base-200 p-4 rounded-full flex flex-row justify-between items-center tooltip sm:w-2/3 w-full" data-tip="Enter your email" onSubmit={(e) => {
							e.preventDefault()
							submitEmail()
						}}>
                            <div className="join gap-2 items-center ml-4 w-full">
                                {/* <p className="text-2xl font-bold join-item">tip.dev/</p>
                                <input className="bg-transparent text-primary text-2xl font-bold focus:outline-none join-item placeholder-zinc-400" placeholder="you" /> */}

                                <input type="email" className="bg-transparent text-xl font-bold focus:outline-none w-full join-item placeholder-zinc-400" placeholder="Get updates"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
                            </div>
                            {/* <button className="btn btn-primary rounded-full">Claim</button> */}
                            <button className="btn btn-primary rounded-full text-xl"><FaArrowCircleRight /></button>
                        </form>

                    </div>
                </div>
            </div>

            <img src="/svg/wave-dark.svg" className="absolute bottom-0 h-40 w-screen object-cover" />

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
        </div>  
    )
}