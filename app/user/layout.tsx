import { ReactNode } from 'react'
import { UserHeader } from 'component/shared/header'

export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen flex-col">
      <UserHeader />
      <div className="flex-1 space-y-4 p-8 pt-6 special-elite container mx-auto">
        <div className={'module-wrapper'}>{children}</div>
      </div>
    </div>
  )
}
