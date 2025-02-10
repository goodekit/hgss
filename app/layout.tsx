import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { GLOBAL } from 'hgss'
import { ThemeProvider } from 'next-themes'
import { Permanent_Marker, Inter_Tight, Covered_By_Your_Grace, Yusei_Magic } from 'next/font/google'
import { TooltipProvider } from 'component/ui'
import { KEY } from 'lib/constant'
import 'design/css/globals.css'

const interTight = Inter_Tight({
  subsets: ['latin']
})

const yuseiMagic = Yusei_Magic({
  weight : '400',
  subsets: ['latin']
})

const coveredByYourGrace = Covered_By_Your_Grace({
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
      <body className={`${interTight.className} ${permanentMarker.className} ${coveredByYourGrace.className} ${yuseiMagic.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme={'dark'} enableSystem disableTransitionOnChange>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
