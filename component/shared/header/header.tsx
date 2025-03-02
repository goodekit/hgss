import { PATH_DIR } from 'hgss-dir'
import { House } from 'lucide-react'
import { Toolbar } from 'component/shared/header'
import { Search } from 'component/shared'
import { ProtectedNavLink } from 'component/shared/protect'

const Header= () => {
  return (
    <header className="w-full h-[40px]">
      <div className="wrapper flex-between h-full overflow-hidden">
        <div className="flex-start">
          {/* <CategoryDrwr /> */}
          <ProtectedNavLink href={PATH_DIR.ROOT} className={`flex-start ml-4`}>
            <div className="h-full flex items-center overflow-hidden">
              <House size={10}/>
            </div>
          </ProtectedNavLink>
        </div>
        <div className="hidden">
          <Search/>
        </div>
        <Toolbar />
      </div>
    </header>
  )
}

export default Header
