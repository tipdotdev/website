import { useMemo } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useKnockFeed } from "@knocklabs/react-notification-feed";
import { useEffect, useState } from "react";
import Knock from "@knocklabs/client"

const knock = new Knock(process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY as string);

export default function NavNotif(props:any) {
    // Group the content blocks by the name for easy lookup
    const blocksByName = useMemo(() => {
        return props.notif.blocks.reduce((acc:any, block:any) => {
        return { ...acc, [block.name]: block };
        }, {});
    }, [props.notif]);

    const maybeActor = props.notif.actors[0];

    knock.authenticate(props.user.id)

    const timeSince = () => {
        // get the time since the notification was created
        const time = new Date(props.notif.inserted_at).getTime();
        const now = new Date().getTime();

        const diff = now - time;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        if (seconds < 60) {
            return `${seconds} seconds ago`;
        } else if (minutes < 60) {
            return `${minutes} minutes ago`;
        } else if (hours < 24) {
            return `${hours} hours ago`;
        } else if (days < 30) {
            return `${days} days ago`;
        } else if (months < 12) {
            return `${months} months ago`;
        }

    };

    const knockFeed = knock.feeds.initialize(process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID as string);

    knockFeed.on("items.read", (notification:any) => {
        console.log("notification:read", notification);
    });

    return (
        <div className="bg-base-200 p-5 rounded-xl mb-2 mt-2 w-full cursor-pointer hover:bg-opacity-75" onClick={() => {
            window.location.href = props.notif.blocks[1].rendered
        }}>
            <div className="indicator">

                <span className="indicator-item badge indicator-start badge-primary"></span> 
    
                {blocksByName.body && (
                    <div
                        className="text-lg text-zinc-300 font-bold"
                        dangerouslySetInnerHTML={{ __html: blocksByName.body.rendered }}
                    />
                )}
                
            </div>
            <p className="text-zinc-500 mt-1">{timeSince()}</p>
        </div>
      );

}