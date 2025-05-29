import { PATH_DIR } from 'hgss-dir'
import { House } from 'lucide-react'
import { ProtectedNavLink } from 'component/shared/protect'
import { Search } from 'component/shared/header/search'
import { ToolbarServer } from 'component/shared/header/toolbar.server'

export const Header= () => {
  return (
    <header className={'sticky top-0 z-40 w-full h-[60px] bg-background'}>
      <div className={'nav-wrapper flex-between h-full overflow-hidden'}>
        <div className={'flex-start'}>
          {/* @matt, let me know what to add in the category drwer. */}
          {/* <CategoryDrwr /> */}
          <ProtectedNavLink href={PATH_DIR.ROOT} className={`flex-start ml-4`}>
            <div className={'h-full flex items-center overflow-hidden'}>
              <House size={20} />
            </div>
          </ProtectedNavLink>
        </div>
        <div className={'hidden'}>
          <Search />
        </div>
        <ToolbarServer moduleType={'user'} />
      </div>
    </header>
  )
}

