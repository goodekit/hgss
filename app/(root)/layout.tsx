import { ReactNode } from 'react'
import { Header } from 'component/shared/header/header'
import { Footer } from 'component/shared/footer/footer'

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Footer />
    </div>
  )
}
