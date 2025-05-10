import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { GLOBAL } from 'hgss'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script'
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { ourFileRouter } from "app/api/uploadthing/core"
import { Special_Elite, Permanent_Marker, Inter_Tight, Yusei_Magic } from 'next/font/google'
import { TooltipProvider, Toaster } from 'component/ui'
import { KEY } from 'lib/constant'
import 'design/css/globals.css'

const interTight = Inter_Tight({
  subsets: ['latin']
})

const yuseiMagic = Yusei_Magic({
  weight : '400',
  subsets: ['latin']
})

const specialElite = Special_Elite({
  weight : '400',
  subsets: ['latin']
})

const permanentMarker = Permanent_Marker({
  weight : '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: `%s • ${GLOBAL.APP_NAME}`,
    default : GLOBAL.APP_NAME
  },
  description : GLOBAL.APP_DESCRIPTION,
  metadataBase: new URL(GLOBAL.SERVER_URL)
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={KEY.EN} suppressHydrationWarning>
      <head>
        <Script src={GLOBAL.RYBBIT} data-site-id="388" strategy="afterInteractive" />
      </head>
      <body className={`${interTight.className} ${specialElite.className} ${permanentMarker.className} ${yuseiMagic.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme={'dark'} enableSystem disableTransitionOnChange>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
