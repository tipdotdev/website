import { FaGlobe, FaMoneyBill, FaUser } from "react-icons/fa";

export default function HomeStats() {
    return (
        <div className="flex flex-col min-h-[50vh] w-screen bg-base-200  items-center">
            <h1 className="text-3xl font-bold text-center mb-5 mt-16 ">Not to show off but...</h1>
            <div className="stats shadow flex w-2/3 mb-5">
  
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaMoneyBill className="inline-block w-8 h-8" />
                    </div>

                    <div className="stat-title">Raised</div>
                    <div className="stat-value mt-2 mb-2">$23M</div>
                    <div className="stat-desc">For developers so far</div>

                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Developers</div>
                    <div className="stat-value mt-2 mb-2">302k</div>
                    <div className="stat-desc">All-time users</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaGlobe className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Embeded on</div>
                    <div className="stat-value mt-2 mb-2">224k</div>
                    <div className="stat-desc">Websites (estimated)</div>
                </div>
                
            </div>

            <p className="text-center w-1/2 text-zinc-400 mb-20">
                We ❤️ transparency. We aim to make all our stats public and available to everyone, so you can see how we're doing, and determine if we're the right platform for you.
            </p>

            <img src="/svg/wave-light.svg" className="relative bottom-0 h-40 w-screen object-cover" />
        </div>
    )
}