import DashboardTopNav from "./dashboard-top-nav";
import DashboardSidebar from "./dashboard-sidebar";
import { cn } from "@/lib/utils";

export function DashboardRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24">
            <DashboardTopNav />
            <DashboardSidebar />
            {children}
        </main>
    );
}

export function DashboardContainer({ children }: { children: React.ReactNode }) {
    return <main className="flex w-full flex-1 pl-44">{children}</main>;
}

export function DashboardGrid({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid h-fit w-full grid-cols-4 items-start justify-start gap-2">
            {children}
        </div>
    );
}

export function DashboardGridItem({
    children,
    className
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "col-span-4 flex h-full items-center justify-between rounded-md border bg-muted p-4",
                className
            )}
        >
            {children}
        </div>
    );
}
