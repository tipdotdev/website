import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import UserDropdown from "./user-dropdown";

export default function DashboardTopNav() {
    return (
        <nav className="fixed top-1 flex w-[85%] items-center justify-between space-x-12 rounded-lg px-[0.3rem] py-[0.3rem] font-serif sm:top-3 ">
            <div className="ml-1 flex items-center space-x-2">
                <Link href="/dashboard">
                    <Image src="/images/svg/logo.svg" alt="tip.dev" width={32} height={4} />
                </Link>
            </div>

            <div className="flex items-center space-x-4">
                <Button
                    variant={"default"}
                    size="sm"
                    className="h-fit py-[0.4rem] font-medium"
                    asChild
                >
                    <Link href="/pricing">Upgrade</Link>
                </Button>
                <UserDropdown />
            </div>
        </nav>
    );
}
