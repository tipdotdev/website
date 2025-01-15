export default function Footer() {
    return (
        <footer className="flex w-full flex-row items-center justify-between gap-4 px-4 py-4 text-center text-sm text-muted-foreground">
            <div className="flex flex-row items-center gap-2">
                <p>© {new Date().getFullYear()} tip.dev</p>
                <p>All rights reserved.</p>
            </div>
        </footer>
    );
}
