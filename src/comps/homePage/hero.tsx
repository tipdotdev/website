import { useState } from "react";
import PlusRotate from "./star";
import Toast from "../toast";
import { FaArrowCircleRight } from "react-icons/fa";

export default function HomeHero() {
    const [email, setEmail] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const submitEmail = async () => {
        let req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/news/enter`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email
            })
        });
        if (req.status === 200) {
            setEmail("");
            setShowToast(true);
            setError(false);
            setErrorText("Successfully signed up");

            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        } else {
            const data = await req.json();
            setError(true);
            setErrorText(data.error.message);
            setShowToast(true);

            setTimeout(() => {
                setShowToast(false);
            }, 5000);
        }
    };

    return (
        <div className={"hero min-h-screen w-screen bg-gradient-to-t from-fuchsia-800/10 to-base-100"}>
            <div className="star_bg w-full absolute top-0 right-0 h-full bg-[url('/svg/grain.svg')] md:flex hidden" />

            <div className="hero-content text-center">
                <div className="max-w-4xl z-0">
                    <div className="hidden sm:block">
                        <a href={"/pricing"} className="absolute top-28 left-44">
                            <PlusRotate width={50} height={50} />
                        </a>
                        <a href={"/pricing"} className="absolute top-50 left-36">
                            <PlusRotate width={20} height={20} />
                        </a>

                        <a href={"/pricing"} className="absolute top-28 right-44">
                            <PlusRotate width={50} height={50} />
                        </a>
                        <a href={"/pricing"} className="absolute top-50 right-36">
                            <PlusRotate width={20} height={20} />
                        </a>
                    </div>
                    <p className="sm:text-4xl text-2xl text-white/50 font-code mb-2">Coming Soon</p>

                    <h1 className={`sm:text-8xl text-5xl font-bold`}>
                        Make{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text ">
                            money
                        </span>{" "}
                        doing what you love
                    </h1>

                    <p className="py-12 text-lg text-white/50 ">
                        A platform for <span className="font-code text-md text-accent/80">developers</span> to get
                        tipped from fans of their work. Embed a link anywhere, and get paid from almost everywhere.
                    </p>

                    {/* <div className="flex flex-row gap-4 justify-center items-center mt-4">
                        
                        <div className="bg-base-200 p-4 rounded-full flex flex-row justify-between items-center">
                            <div className="join gap-2 items-center ml-4">
                                <p className="text-2xl font-bold join-item">tip.dev/</p>
                                <input className="bg-transparent text-primary text-2xl font-bold focus:outline-none join-item placeholder-zinc-400" placeholder="you" />
                            </div>
                            <button className="btn btn-primary rounded-full">Claim</button>
                        </div>

                    </div> */}

                    <div className="flex flex-row gap-4 justify-center items-center mb-20 w-full">
                        <form
                            className="bg-base-200 p-4 rounded-full flex flex-row justify-between items-center tooltip sm:w-2/3 w-full"
                            data-tip="Enter your email"
                            onSubmit={(e) => {
                                e.preventDefault();
                                submitEmail();
                            }}
                        >
                            <div className="join gap-2 items-center ml-4 w-full">
                                {/* <p className="text-2xl font-bold join-item">tip.dev/</p>
                                <input className="bg-transparent text-primary text-2xl font-bold focus:outline-none join-item placeholder-zinc-400" placeholder="you" /> */}

                                <input
                                    type="email"
                                    className="bg-transparent text-xl font-bold focus:outline-none w-full join-item placeholder-zinc-400"
                                    placeholder="Get updates"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                            {/* <button className="btn btn-primary rounded-full">Claim</button> */}
                            <button className="btn btn-primary rounded-full text-xl">
                                <FaArrowCircleRight />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <img src="/svg/wave-dark.svg" className="absolute bottom-0 h-40 z-[99] w-screen object-cover" />

            {showToast && (
                <>
                    {error && <Toast type="error" text={errorText} />}
                    {!error && <Toast type="success" text="Successfully signed up" />}
                </>
            )}
        </div>
    );
}
