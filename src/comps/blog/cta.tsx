import { useState } from "react"
import Toast from "../toast"

export default function BlogCTA(props:any) {

    const [email, setEmail] = useState('')
    const [ showToast, setShowToast ] = useState(false)
	const [ error, setError ] = useState(false)
	const [ errorText, setErrorText ] = useState("")

	const subscribe = async () => {
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
        <div className="flex flex-col items-center w-full mb-20 bg-base-200 p-6 rounded-xl">
            <div className="flex flex-col w-full">
                <h1 className="text-4xl font-black mb-4">Don't miss new posts!</h1>
                <p className="text-md text-zinc-200">Subscribe to our newsletter to get updates when we post.</p>
                <p className="text-sm mb-4 text-zinc-400">No ads, no spam. Just {"{$}"} news.</p>

                <form className="flex flex-col w-full mt-10"
                    onSubmit={(e) => { 
                        e.preventDefault()
                        subscribe()
                    }}
                >
                    <p className="text-md mb-2 text-zinc-400">Email</p>
                    <div className="join">
                        <input type="text" placeholder="hello@tip.dev" className="input input-bordered join-item w-full"
                            onChange={(e) => setEmail(e.target.value)} value={email}
                        />
                        <button className="btn btn-primary rounded-l-none">Subscribe</button>
                    </div>
                </form>
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
        </div>
    )
}