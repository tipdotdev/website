import Navbar from "@/components/navbar";
import SigninForm from "@/components/signin-form";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            <Navbar active="signin" />
            <SigninForm />
        </main>
    );
}
