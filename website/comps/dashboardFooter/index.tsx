import { FaRegCopyright } from "react-icons/fa";

export default function DashboardFooter() {
    return (
        <footer className="footer p-4 bg-base-100 text-base-content bottom-0 z-[99]">
            <div className="footer-title flex-row flex justify-center items-center">
                <p>{"{$}"}</p>
                <FaRegCopyright />
                <p>2023 tip.dev</p>
                <p>|</p>
                <a href="/terms" className="link link-hover link-primary text-inherit">Terms</a>
                <a href="/privacy" className="link link-hover link-primary text-inherit">Privacy</a>
            </div>
        </footer>
    )
}