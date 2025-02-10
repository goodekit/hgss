import Image from 'next/image'
import { ProtectedNavLink } from 'component/shared/protect'
import { Toolbar } from 'component/shared/header'
import { CategoryDrwr, Search } from 'component/shared'
import { GLOBAL } from 'hgss'
import { ASSET_DIR, PATH_DIR } from 'hgss-dir'
import { LOGO } from 'hgss-design'

const Header = () => {
  return (
    <header className="w-full">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <CategoryDrwr />
          {/* use search params to check if they are in home, then dont show this */}
          {/* <ProtectedNavLink href={PATH_DIR.ROOT} className={'flex-start ml-4'}>
            <Image src={ASSET_DIR.LOGO} alt="logo" width={LOGO.HEADER_LOGO_W} height={LOGO.HEADER_LOGO_H} priority />
            <span className="hidden lg:block ml-3">{GLOBAL.APP_NAME}</span>
          </ProtectedNavLink> */}
        </div>
        <div className="hidden md:block">
          <Search/>
        </div>
        <Toolbar />
      </div>
    </header>
  )
}

export default Header
