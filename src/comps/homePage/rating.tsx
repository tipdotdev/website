import { FaStar, FaStarHalf } from "react-icons/fa";

export default function RatingSmall(props:any) {
    return (
        <>
            {props.rating?.map((rating:any) => (
        
                <div className="flex flex-col justify-center items-center bg-base-100 rounded-lg p-4 w-full">
                    {/* <h1 className="text-xl font-bold mb-2">
                        {rating?.name}
                    </h1> */}
                    
                    <div className="flex flex-row justify-evenly items-center w-full">
                         
                        {[...Array(rating?.stars)].map((e, i) => (
                        <FaStar className="inline-block w-5 h-5 text-yellow-400" />
                        ))}
                        
                        {[...Array(5 - rating?.stars)].map((e, i) => (
                        <FaStar className="inline-block w-5 h-5 text-zinc-400" />
                        ))}

                    </div>

                    <p className="text-lg text-zinc-400 mt-2">
                        "{rating?.review}"
                    </p>
                </div>
        
            ))}

        </>
    )
}