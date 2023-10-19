import { FaGlobe, FaMoneyBill, FaUser } from "react-icons/fa";

export default function HomeStats() {
    return (
        <div className="flex flex-col min-h-[50vh] w-screen bg-base-200  items-center">
            <div className="stats shadow flex mb-5 mt-20 w-3/4">
  
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaMoneyBill className="inline-block w-8 h-8" />
                    </div>

                    <div className="stat-title">Raised</div>
                    <div className="stat-value mt-2 mb-2 text-7xl">$23M</div>
                    <div className="stat-desc">For developers so far</div>

                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Developers</div>
                    <div className="stat-value mt-2 mb-2 text-7xl">302k</div>
                    <div className="stat-desc">Verified all-time users</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaGlobe className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Embeded on</div>
                    <div className="stat-value mt-2 mb-2 text-7xl">224k</div>
                    <div className="stat-desc">Websites (estimated)</div>
                </div>
                
            </div>

            <p className="text-center w-1/2 text-zinc-400 mb-20">
                We ❤️ transparency and endeavor to make all our statistics accessible to the public. This enables you to gauge our performance and determine if our platform suits your requirements. (we are just starting out so go easy on us)
            </p>

            <img src="/svg/wave-light.svg" className="relative bottom-0 h-40 w-screen object-cover" />
        </div>
    )
}