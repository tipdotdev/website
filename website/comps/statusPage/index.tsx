import { useEffect, useState } from "react"

export default function StatusPageEmbed(props:any) {

    const [status, setStatus] = useState("Online")

    const getAllMonitors = async () => {
        const req = await fetch("https://uptime.betterstack.com/api/v2/monitors", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.STATUS_API_KEY
            }
        })

        if (!req.ok) {
            return false
        }

        const res = await req.json()

        return res
    }

    const determineStatus = async () => {

        const monitors = await getAllMonitors()

        if (!monitors) {
            setStatus("Offline")
            return
        }

        // for each monitor make sure that the attributes.status is "up" if any are not up then the status is down
        let isOnline = true

        monitors.data.forEach((monitor:any) => {
            if (monitor.attributes.status != "up") {
                isOnline = false
            }
        })

        if (isOnline) {
            setStatus("Online")
        } else {
            setStatus("Offline")
        }

    }

    useEffect(() => {
        // determineStatus()
    }, [])

    return (
        <a className={`justify-center items-center flex flex-row
            transition-all ease-in-out duration-150 cursor-pointer
            ${props.showText ? "hover:bg-neutral-focus p-1 px-2 rounded-lg" : ""}
        `}
            href="https://status.tip.dev"
            target="_blank"
        >

            <script src="https://uptime.betterstack.com/widgets/announcement.js" data-id="171350" async={true} type="text/javascript"></script>
            
            {status == "Online" ?
                <div className="animate-pulse bg-success rounded-lg h-3 w-3"></div>
            :
                <div className="animate-pulse bg-error rounded-lg h-3 w-3"></div>
            }  
            
            {props.showText &&
                <p className={`ml-2 ${status == "Online" ? "text-success" : "text-error"}`}>Systems {status}</p>
            }
        </a>
    )
}