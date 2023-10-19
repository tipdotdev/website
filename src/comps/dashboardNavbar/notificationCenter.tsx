import { useEffect, useState } from "react"
import { FaBell } from "react-icons/fa"
import NavNotif from "./notification"
import { useNotifications } from "@novu/notification-center"
import useUser from "../../hooks/useUser"

export function NotificationCenter() {

    const { user, isAuthLoading } = useUser()
    const { notifications, fetchNextPage, hasNextPage, isLoading, isFetching, markAllNotificationsAsRead } = useNotifications();

    const [unreadCount, setUnreadCount] = useState(0);
    useEffect(() => {
        // find all the notifs.read_at values that are null
        const unread = notifications?.filter((notif) => !notif.seen);
        setUnreadCount(unread?.length);
    }, [notifications]);

    // only show the 5 most recent notifications
    const recentNotifs = notifications?.slice(0, 5);

    // run this every 5 seconds
    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         refetch();
    //     }, 5000);
    //     return () => clearInterval(interval);
    // }, []);

    const readNotifs = () => {
        // mark all notifications as read when bell is not focused
        setTimeout(() => {
            markAllNotificationsAsRead()
        }, 5000);
    }

    if (!isAuthLoading) {

        return (
            <div className="dropdown dropdown-end">
                <label tabIndex={0}>
                    <div className="btn btn-ghost btn-circle mr-5">
                        <div className="indicator justify-center items-center">
                            {unreadCount > 0 && (
                                <span className="indicator-item badge badge-primary indicator-top indicator-end">{unreadCount}</span> 
                            )}
                            <div className="text-zinc-300 ">
                                <FaBell className="w-7 h-7" onClick={() => readNotifs()} />
                            </div>
                        </div>
                    </div>
                </label>
                <div className="menu menu-sm dropdown-content mt-3 p-4 bg-base-300 rounded-box w-[30rem] z-[99] border border-zinc-800" onFocus={() => {
                    readNotifs();
                }}>
                    <p className="text-lg">Notifications</p>
                    <div className="divider mt-1 mb-1"></div>
                    <ul tabIndex={0} className="">
                        {recentNotifs?.length == 0 && (
                            <li>
                                <p>
                                    No notifications yet.
                                </p>
                            </li>
                        )}
                        {recentNotifs?.map((notif, index) => (
                            <NavNotif key={index} notif={notif} user={user} />
                        ))}
                    </ul>
                </div>
            </div>
        )
    } else {
        <>
        </>
    }
}