import GithubLoginButton from "./github";
import GoogleLoginButton from "./google";

export default function OAuthOptions() {

    return (
        <>
            <div className="mt-10">
                <GithubLoginButton />
            </div>

            <div className="mt-2">
                <GoogleLoginButton />
            </div>
        </>
    )
}