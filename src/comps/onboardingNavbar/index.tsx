export default function OnboardingNav({step}: {step: number}) {
    return (
        <div className="flex flex-col w-full top-0 absolute justify-center items-center px-10 py-5">
            <>
                {step == 1 ? (
                    
                    <ul className="steps sm:w-1/2 w-full">
                        <li className="step step-primary"></li>
                        <li className="step"></li>
                        <li className="step"></li>
                    </ul>

                ) : step == 2 ? (
                    <ul className="steps sm:w-1/2 w-full">
                        <li className="step step-primary"></li>
                        <li className="step step-primary"></li>
                        <li className="step"></li>
                    </ul>
                ) : step == 3 ? (
                    <ul className="steps sm:w-1/2 w-full">
                        <li className="step step-primary"></li>
                        <li className="step step-primary"></li>
                        <li className="step step-primary"></li>
                    </ul>
                ) : (
                    null
                )}
            </>
        </div>
    )
}