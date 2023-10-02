import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { dark, neobrutalism } from '@clerk/themes';
import { ClerkProvider } from '@clerk/nextjs'
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </>
  )
}
