import CookieConsetPopup from '@/comps/modals/cookieConsent';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {

  const [showCookieConsent, setShowCookieConsent] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("cookiesAccepted") !== "true") {
      setShowCookieConsent(true)
    }
  }, [])

  return (
    <>
      <GoogleAnalytics trackPageViews />
      {showCookieConsent && <CookieConsetPopup setShow={setShowCookieConsent} />}
      <Component {...pageProps} />
    </>
  )
}
