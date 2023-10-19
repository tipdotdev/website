import { useRouter } from "next/router"
import { useEffect } from "react"

export default function RedirectToSignin() {
    const router = useRouter()

    useEffect(() => {
        router.push("/signin")
    }, [])

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <span className="loading loading-spinner loading-md"></span>
        </div>
    )
}