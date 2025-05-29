import { ASSET_DIR, PATH_DIR } from 'hgss-dir'
import Image from 'next/image'
import Link from 'next/link'
import { AdminSearch } from 'component/admin'
import { ToolbarServer } from 'component/shared/header/toolbar.server'
import MainNav from 'app/admin/main-nav'

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full h-[40px] bg-background">
      <div className="wrapper flex-center h-full overflow-hidden">
        <div className="flex-start">
          <Link href={PATH_DIR.ROOT} className={'h-auto w-22'}>
            <div className={'flex items-center overflow-hidden'}>
              <Image src={ASSET_DIR.LOGO} height={70} width={50} alt={'logo'} className={'object-cover'} />
            </div>
          </Link>
        </div>
        <MainNav className={'mx-6 hidden md:block'} />
        <div className={'ml-auto items-center flex'}>
          <div className={'mr-5'}>
            <AdminSearch />
          </div>
          <ToolbarServer moduleType={'admin'} />
        </div>
      </div>
    </header>
  )
}

export default AdminHeader
