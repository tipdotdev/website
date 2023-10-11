import { FaDashcube, FaInfinity, FaChartArea, FaCode, FaDiscord, FaGlobe, FaLock } from "react-icons/fa"

export default function FeatureGrid() {

    const features = [
        {
            "title": "Unlimited transactions",
            "desc": "We will never limit the amount of money you can make.",
            "icon": <FaInfinity className="w-6 h-6 text-primary" />,
        },
        {
            "title": "Beautiful dashboard",
            "desc": "We have spent hundreds of hours designing the perfect dashboard for you.",
            "icon": <FaChartArea className="w-6 h-6 text-secondary" />,
        },
        {
            "title": "Integrations",
            "desc": "We have some super cool prebuilt integrations, or you can make your own.",
            "icon": <FaCode className="w-6 h-6 text-accent" />,
        },
        {
            "title": "Dev community",
            "desc": "Anyone can join our fun and friendly community, made up of people just like you.",
            "icon": <FaDiscord className="w-6 h-6 text-indigo-500" />,
        },
        {
            "title": "Short URL",
            "desc": "Who doesn't love a short URL? Anyone can use tip.dev/yourname. Short and sweet.",
            "icon": <FaGlobe className="w-6 h-6 text-green-500" />,
        },
        {
            "title": "Security and privacy",
            "desc": "We take security and privacy very seriously. Your data is your data.",
            "icon": <FaLock className="w-6 h-6 text-blue-500" />,
        },
        
    ]

    return (
        <div className="grid grid-cols-3 gap-4">
            {features.map((feature) => {
                return (
                    <div className="bg-base-200 rounded-lg p-6 hover:scale-105 border-none transition-all ease-in-out duration-150">

                        <div className="flex flex-row items-center mb-4 gap-2">
                            {feature.icon}
                            <h1 className="text-xl font-bold">
                                {feature.title}
                            </h1>
                        </div>
                            

                        <p className="text-lg text-zinc-400">
                            {feature.desc}
                        </p>
                    </div>
                )
            })}
            

        </div>
    )
}