import { FaArrowCircleLeft, FaBars, FaBell, FaDollarSign, FaEnvelope, FaGripVertical, FaUserCircle } from "react-icons/fa";
import useUser from "../../hooks/useUser"
import { useState, useEffect } from "react";
import NavNotif from "./notification";
import { KnockFeedProvider, useKnockFeed } from "@knocklabs/react-notification-feed";
import { NotificationCenter } from "./notificationCenter";
import { NotificationBell, NovuProvider, PopoverNotificationCenter } from "@novu/notification-center";
import Avatar from "../avatar";
import UserMenu from "../navbar/userMenu";

export default function DashboardTopNav(props:any) {
    const { isAuthLoading, isSignedIn, user, logout } = props

    return (
        <div className="navbar w-full bg-base-100 mb-5 top-0 absolute px-32 py-5 z-[100]">
            <div className="navbar-start">
                <a className="btn btn-ghost normal-case text-xl" href="/">
                    <img src="/images/webp/logo.webp" className="h-10 w-fit" />
                    <div className="badge badge-warning badge-sm">BETA</div>
                </a>
            </div>
            
            {isSignedIn && !isAuthLoading && user ? ( 
                <div className="navbar-end">
                    <NovuProvider
                        applicationIdentifier={process.env.NEXT_PUBLIC_NOVU_APP_ID as string}
                        subscriberId={user.user_id}
                        initialFetchingStrategy={{ fetchNotifications: true, fetchUserPreferences: true, fetchUnseenCount: true }}
                    >
                        <>
                            <NotificationCenter />

                            {/* <PopoverNotificationCenter
                                colorScheme="dark"
                            >
                                {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                            </PopoverNotificationCenter> */}
                            
                            <UserMenu user={user} logout={logout} />
                        </>
                    </NovuProvider>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}