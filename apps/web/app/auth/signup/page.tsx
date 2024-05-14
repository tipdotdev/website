import Navbar from "@/components/navbar";
import SignupForm from "@/components/signup-form";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4  sm:p-24">
            <Navbar />
            <SignupForm />
        </main>
    );
}
