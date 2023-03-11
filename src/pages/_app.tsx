import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false

import type { AppProps } from 'next/app'
import type { Session } from "next-auth"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}