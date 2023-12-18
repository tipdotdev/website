import { FaGlobe, FaMoneyBill, FaUser } from "react-icons/fa";
import RatingSmall from "./rating";
import { useEffect, useState } from "react";
import abbrNum from "@/utils/abbrNumber";

export default function HomeStats() {

    const [ratings, setRatings] = useState([
        {
            name: "John Doe",
            review: "i love this platform",
            stars: 5,
        },
        {
            name: "Steve Jobs",
            review: "dude so cool",
            stars: 4
        },
        {
            name: "Joe Biden",
            review: "im so rich now",
            stars: 5
        },
    ])
    const [stats, setStats] = useState({
        userCount: 0,
        profilePageViewCount: 0,
        raised: 0
    })
    const [isLoading, setIsLoading] = useState(true)

    const getStats = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/analytics/platform/stats/basic`)
            const data = await res.json()
            
            setStats({
                userCount: data?.stats?.userCount,
                profilePageViewCount: data?.stats?.profilePageViewCount,
                raised: data?.stats?.raised
            })

            setIsLoading(false)
        } catch (err) {
            console.log(err)
            setStats({
                userCount: 500,
                profilePageViewCount: 500000,
                raised: 1000000
            })
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getStats()
    }, [])

    return (
        <div className="flex z-10 flex-col min-h-[50vh] w-screen bg-base-200  items-center">

            <p className="text-md text-center mb-2 mt-10 italic text-zinc-400">
                Totally real (fake) reviews
            </p>
            <div className="flex flex-row justify-between items-center gap-4 w-1/2">
                <RatingSmall rating={ratings} />
            </div>

            <div className="stats shadow flex mb-5 mt-16 w-3/4">
  
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <FaMoneyBill className="inline-block w-8 h-8" />
                    </div>

                    <div className="stat-title">Amount raised</div>
                    {isLoading ? (
                        <div className="loading loading-spinner loading-md text-zinc-400 my-8"></div>
                    ) :
                        <div className="stat-value mt-2 mb-2 text-7xl">${abbrNum(stats?.raised / 100 || 0, 1)}</div>
                    }
                    <div className="stat-desc">For developers so far</div>

                </div>
                
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Developers</div>
                    {isLoading ? (
                        <div className="loading loading-spinner loading-md text-zinc-400 my-8"></div>
                    ) :
                        <div className="stat-value mt-2 mb-2 text-7xl">{abbrNum(stats?.userCount || 0, 0)}</div>
                    }
                    <div className="stat-desc">Making money</div>
                </div>
                
                <div className="stat">
                    <div className="stat-figure text-accent">
                        <FaGlobe className="inline-block w-8 h-8" />
                    </div>
                    <div className="stat-title">Profile Views</div>
                    {isLoading ? (
                        <div className="loading loading-spinner loading-md text-zinc-400 my-8"></div>
                    ) :
                        <div className="stat-value mt-2 mb-2 text-7xl">{abbrNum(stats.profilePageViewCount || 0, 1)}</div>
                    }
                    <div className="stat-desc">On developer profile pages</div>
                </div>
                
            </div>

            <p className="text-center w-1/2 text-zinc-400 mb-10">
                We ❤️ transparency and endeavor to make all our statistics accessible to the public. This enables you to gauge our performance and determine if our platform suits your requirements. (we are just starting out so go easy on us)
            </p>

            <img src="/svg/wave-light.svg" className="relative bottom-0 h-40 w-screen object-cover" />
        </div>
    )
}