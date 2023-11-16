export default function CookieConsetPopup(props:any) {

    const acceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "true")
        props.setShow(false)
    }

    return (
        <section className="fixed z-[99] sm:max-w-lg w-screen p-4 sm:left-4 sm:bottom-4 bottom-0 rounded-2xl bg-base-200/20 backdrop-blur-xl border border-zinc-600/50 shadow-md">
            
            <div className="flex sm:flex-row flex-col justify-between items-center gap-2">
                <div className="flex flex-col justify-center items-start">
                    <h2 className="font-semibold text-white -mb-2">🍪 Cookie Notice</h2>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">This website uses cookies to ensure you have the best possible experience. <a href="/policies/cookies" className="link link-primary">Read cookie policy</a>. </p>
                </div>
                
                <button className="btn btn-ghost mt-2 sm:mt-0 normal-case sm:w-fit w-full" onClick={acceptCookies}>Accept</button>
            </div>
            
        </section>
    )
}