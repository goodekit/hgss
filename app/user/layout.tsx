import { ReactNode } from 'react'
import { ASSET_DIR, PATH_DIR } from 'hgss-dir'
import Image from 'next/image'
import Link from 'next/link'
import { Toolbar } from 'component/shared'
import MainNav from './main-nav'

export default function UserLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <header className="w-full h-[40px] border-b">
        <div className="wrapper flex-center h-full overflow-hidden">
          <div className="flex-start">
            <Link href={PATH_DIR.ROOT} className={''}>
              <div className="h-full flex items-center overflow-hidden">
                <Image src={ASSET_DIR.LOGO} width={70} height={70} alt={'logo'} className={'object-cover max-h-full'}/>
              </div>
            </Link>
          </div>
          <MainNav className={'mx-6'} />
          <div className="ml-auto items-center flex">
            <Toolbar />
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6 container mx-auto">{children}</div>
    </header>
  )
}
