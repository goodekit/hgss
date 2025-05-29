import { ASSET_DIR, PATH_DIR } from 'hgss-dir'
import Image from 'next/image'
import Link from 'next/link'
import ToolBarServer from 'component/shared/header/toolbar.server'
import MainNav from 'app/user/main-nav'

const UserHeader = () => {
  return (
    <header className={'sticky top-0 z-50 w-full h-[40px] bg-background'}>
      <div className="wrapper flex-center h-full overflow-hidden">
        <div className="flex-start">
          <Link href={PATH_DIR.ROOT} className={'h-auto w-22'}>
            <div className="flex items-center overflow-hidden">
              <Image src={ASSET_DIR.LOGO} height={70} width={50} alt={'logo'} className={'object-cover'} />
            </div>
          </Link>
        </div>
        <MainNav className={'mx-6 hidden md:block'} />
        <div className="ml-auto items-center flex">
          <ToolBarServer moduleType={'user'} />
        </div>
      </div>
    </header>
  )
}

export default UserHeader
