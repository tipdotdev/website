export default function HomeHero() {
    return (
        <div className="hero min-h-screen w-screen bg-base-100
            bg-[url('/svg/grain.svg')]
            bg-blend-overlay
            bg-opacity-[10%]
        ">
            <div className="hero-content text-center ">
                <div className='
					absolute
					w-[30rem]
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

                    <h1 className="text-8xl font-bold">
                        Make <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text ">money</span> doing what you love
                    </h1>

                    <p className="py-6 text-lg text-zinc-300">A platform for developers to get tipped from fans of their work. Embed a link anywhere, and get paid from almost everywhere.</p>

                    <div className="flex flex-row gap-4 justify-center items-center mt-4">
                        
                        <div className="bg-base-200 p-4 rounded-full flex flex-row justify-center items-center">
                            <div className="join gap-2 items-center ml-4">
                                <p className="text-2xl font-bold join-item">tip.dev/</p>
                                <input className="bg-transparent text-2xl font-bold focus:outline-none join-item placeholder-zinc-400" placeholder="you" />
                            </div>
                            <button className="btn btn-primary rounded-full">Claim</button>
                        </div>

                    </div>
                </div>
            </div>

            <img src="/svg/wave-dark.svg" className="absolute bottom-0 h-40 w-screen object-cover" />
        </div>  
    )
}