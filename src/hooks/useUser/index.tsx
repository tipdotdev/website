// make a custom hook called useUser that returns the a user object

import { useState, useEffect } from 'react'

const useUser = () => {

    const [token, setToken] = useState("" as any)
    const [user, setUser] = useState(null as any)
    const [isAuthLoading, setIsLoading] = useState(true)
    const [isSignedIn, setIsSignedIn] = useState(false)

    // get token from local storage
    useEffect(() => {
        if (typeof window !== "undefined") {

            setToken(localStorage.getItem("td:token"))

            if (token !== null && token !== undefined && token !== "") {
                setIsSignedIn(true)
            } else {
                setIsSignedIn(false)
                setIsLoading(false)
            }
        }
    }, [])

    // make a function to save the token to local storage
    const saveToken = (token:string) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("td:token", token)
        }
    }

    const logout = (redirect?:string) => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("td:token")

            if (redirect) {
                window.location.href = redirect
            }
        }
    }

    const getUser = async () => {
        if (token !== null && token !== undefined && token !== "") {

            let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/user/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
            if (req.status == 200) {
                let data = await req.json()

                setUser(data.user)
                setIsSignedIn(true)

                if (data.user.needs_username || data.user.needs_payout) {

                    const currentPath = window.location.pathname

                    const onboardingPaths = [
                        "/onboarding/username",
                        "/onboarding/profile",
                        "/onboarding/payout"
                    ]

                    if (data.user.needs_username && !onboardingPaths.includes(currentPath)) {
                        window.location.href = "/onboarding/username"
                        return
                    }

                    if (data.user.needs_payout && !onboardingPaths.includes(currentPath)) {
                        window.location.href = "/onboarding/payout"
                        return
                    }

                }

                setIsLoading(false)
                setIsSignedIn(true)
            }
        }
    }

    useEffect(() => {
        getUser()
    }, [token])

    return { token, isAuthLoading, isSignedIn, saveToken, logout, user } as const
}

export default useUser