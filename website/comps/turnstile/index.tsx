import Script from 'next/script'
import { useEffect } from 'react'

type RenderParameters = {
  sitekey: string
  theme?: 'light' | 'dark'
  callback?(token: string): void
  appearance?: 'always' | 'execute',
  size?: 'compact' | 'normal'
}

declare global {
  interface Window {
    onloadTurnstileCallback(): void
    turnstile: {
      render(container: string | HTMLElement, params: RenderParameters): void
    }
  }
}

export default function Turnstile(props:any) {

  return (
    <div>
      <Script id="cf-turnstile-callback">
        {`window.onloadTurnstileCallback = function () {
          window.turnstile.render('#my-widget', {
            sitekey: '${process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}',
            theme: 'dark',
            // in the callback, return the token to the parent
            callback: function (token) {
              window.parent.postMessage(token, '*')
            },
            appearance: 'always',
            size: 'normal'
          })
        }`}
      </Script>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback"
        async={true}
        defer={true}
      />
      <div id="my-widget" className='mb-5 justify-center items-center' />
    </div>
  )
}