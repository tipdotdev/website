import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <script
        src="/plausible/js/script.js"
        data-api="/plausible/api/event"
        data-domain="tip.dev"
      ></script>
      <Component {...pageProps} />
    </>
  )
}
