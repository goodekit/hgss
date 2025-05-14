import { ReactNode } from 'react'
import { AdminHeader } from 'component/admin'

export default function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex h-screen flex-col">
      <AdminHeader />
      <div className={'flex-1 space-y-4 p-8 pt-6 special-elite container mx-auto'}>
        <main className={'module-wrapper'}>{children}</main>
      </div>
    </div>
  )
}
