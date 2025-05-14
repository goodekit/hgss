import { ASSET_DIR, PATH_DIR } from 'hgss-dir'
import Image from 'next/image'
import Link from 'next/link'
import { Toolbar } from 'component/shared/header'
import MainNav from 'app/user/main-nav'

const UserHeader = () => {
  return (
    <header className={"sticky top-0 z-50 w-full h-[40px] bg-background"}>
      <div className="wrapper flex-center h-full overflow-hidden">
        <div className="flex-start">
          <Link href={PATH_DIR.ROOT} className={''}>
            <div className="h-full flex items-center overflow-hidden">
              <Image src={ASSET_DIR.LOGO} width={70} height={70} alt={'logo'} className={'object-cover max-h-full'} />
            </div>
          </Link>
        </div>
        <MainNav className={'mx-6 hidden md:block'} />
        <div className="ml-auto items-center flex">
          <Toolbar moduleType={'user'} />
        </div>
      </div>
    </header>
  )
}

export default UserHeader
