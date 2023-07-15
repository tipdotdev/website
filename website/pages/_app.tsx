import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { dark, neobrutalism } from '@clerk/themes';
import { ClerkProvider } from '@clerk/nextjs'
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps} appearance={{
      baseTheme: dark,
      variables: {
        colorPrimary: "#ff7ac6",
        colorBackground: "#181920",
        colorInputBackground: "#272935",
        baseTheme: dark
      },
      layout: {
        privacyPageUrl: "/privacy",
        termsPageUrl: "/tos",
      }
    }} >
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </ClerkProvider>
  )
}
