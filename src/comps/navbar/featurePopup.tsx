import Script from "next/script";
import { useEffect } from "react";

export default function FeatureRequestPopup(props:any) {

    useEffect(() => {
        const win = window as any;
    
        if (typeof win.Featurebase !== "function") {
          win.Featurebase = function () {
            // eslint-disable-next-line prefer-rest-params
            (win.Featurebase.q = win.Featurebase.q || []).push(arguments);
          };
        }
        win.Featurebase("initialize_feedback_widget", {
          organization: "tipdev",
          theme: "dark",
        });
    }, []);

    return (
        <>
            <Script src="https://do.featurebase.app/js/sdk.js" id="featurebase-sdk" />
            <div>
                {props.button}
            </div>
        </>
    )
} 